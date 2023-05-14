"""
Extract Form 217a data from an Excel file and upload to MongoDB.

Usage: python extractor.py <filename.xlsx>
"""

import sys
import os
import re
import pandas as pd
from pymongo import MongoClient


def parse_excel_217(filename):
    """
    Parse the Form 217a Excel file and return a DataFrame.
    """
    # read the data from the first sheet in the Excel file
    df = pd.read_excel(filename, sheet_name=0, header=2, dtype='string')
    df.rename(columns={
        "Pg No": "page",
        "Channel Configuration": "config",
        "Channel Name/Trunked Radio System Talkgroup": "name",
        "Eligible Users": "eligibleUsers",
        "RX Freq N or W": "rxFreq",
        "Unnamed: 5": "rxWidth",
        "RX Tone/NAC": "rxTone",
        "TX Freq N or W": "txFreq",
        "Unnamed: 8": "txWidth",
        "Tx Tone/NAC": "txTone",
        "Mode A, D or M": "mode",
        "Remarks": "remarks",
    }, inplace=True)

    # filter the rows
    df = df[df['page'].str.isnumeric()]
    df = df[df['name'].notna()]

    # clean up data
    df['remarks'] = df['remarks'].str.replace('\n', ' ')
    df['rxFreq'] = df['rxFreq'].str.removesuffix('LSB')
    df['txFreq'] = df['txFreq'].str.removesuffix('LSB')
    df['rxFreq'] = df['rxFreq'].str.removesuffix('USB')
    df['txFreq'] = df['txFreq'].str.removesuffix('USB')
    df['rxFreq'] = df['rxFreq'].str.replace('****', '0')
    df['txFreq'] = df['txFreq'].str.replace('****', '0')

    # change data types for the freq columns
    df = df.astype({
        'rxFreq': 'float',
        'txFreq': 'float',
    })

    # round the freq columns to 5 decimal places
    df['rxFreq'] = df['rxFreq'].round(5)
    df['txFreq'] = df['txFreq'].round(5)
    return df


# read the file given from the command line
if sys.argv is None or len(sys.argv) < 2:
    print('Usage: python extractor.py <filename.xlsx>')
    exit()
filename = sys.argv[1]
print(filename)
df = parse_excel_217(filename)

# Group by the first 2-3 numbers and one character of the name column
df['group'] = df['name'].str.extract(r'^(\d{2,3}\w)')

# for each group, insert a document into the database
connection_string = os.environ.get('MONGODB_CONNECTION_STRING')
client = MongoClient(connection_string, 27017)
db = client['test']
collection = db['form217as']
for group in df['group'].unique():
    df_group = df[df['group'] == group]
    df_group.drop(columns=['group'], inplace=True)
    df_group['order'] = df_group.index + 1

    matches = re.search(r'^(\d{1,2})(\d)(\w)', group)
    region = matches.group(1)
    district = matches.group(2)
    band = matches.group(3)
    channels = df_group.to_dict('records')

    # Map band character to band name
    band = {
        'D': 'Digital',
        'H': 'HF',
        'P': 'Packet',
        'U': 'UHF',
        'V': 'VHF',
    }[band]

    owner = f'Region {region} District {district}'
    if region == '1' and district == '0':
        owner = 'Colorado Section'
    form217doc = dict({'owner': owner, 'frequencyBand': band,
                      'channels': channels})
    collection.insert_one(form217doc)
