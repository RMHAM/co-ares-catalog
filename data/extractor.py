"""
Extract Form 217a data from an Excel file and export it to a CSV file.

Usage: python extractor.py <filename.xlsx>
"""

import sys
import pandas as pd


def parse_excel_217(filename):
    """
    Parse the Form 217a Excel file and return a DataFrame.
    """
    # read the data from the first sheet in the Excel file
    df = pd.read_excel(filename, sheet_name=0, header=2, dtype='string')
    df.rename(columns={
        "Channel Name/Trunked Radio System Talkgroup": "Channel Name",
        "RX Freq N or W": "RX Freq",
        "Unnamed: 5": "RX Width",
        "TX Freq N or W": "TX Freq",
        "Unnamed: 8": "TX Width",
        "Mode A, D or M": "Mode",
    }, inplace=True)

    # filter the rows
    df = df[df['Pg No'].str.isnumeric()]
    df = df[df['Channel Name'].notna()]

    # clean up data
    df['Remarks'] = df['Remarks'].str.replace('\n', ' ')
    df['RX Freq'] = df['RX Freq'].str.removesuffix('LSB')
    df['TX Freq'] = df['TX Freq'].str.removesuffix('LSB')
    df['RX Freq'] = df['RX Freq'].str.removesuffix('USB')
    df['TX Freq'] = df['TX Freq'].str.removesuffix('USB')
    df['RX Freq'] = df['RX Freq'].str.replace('****', '0')
    df['TX Freq'] = df['TX Freq'].str.replace('****', '0')

    # change data types for the freq columns
    df = df.astype({
        'RX Freq': 'float',
        'TX Freq': 'float',
    })

    # round the freq columns to 5 decimal places
    df['RX Freq'] = df['RX Freq'].round(5)
    df['TX Freq'] = df['TX Freq'].round(5)
    return df


# read the file given from the command line
if sys.argv is None or len(sys.argv) < 2:
    print('Usage: python extractor.py <filename.xlsx>')
    exit()
filename = sys.argv[1]
print(filename)
df = parse_excel_217(filename)

# export the data to a CSV file
out_filename = filename.removesuffix('.xlsx') + '.csv'
df.to_csv(out_filename, index=False)
