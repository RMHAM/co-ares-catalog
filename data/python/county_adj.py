# Use Census Bureau KML to create US county adjacency matrix.
# https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html

from fastkml import kml

with open('cb_2022_us_county_500k.kml', 'rb') as kml_file:
    kml_string = kml_file.read()

kml_string = kml_string.replace(b'xsd:string', b'string')
kml_string = kml_string.replace(b'xsd:double', b'double')

k = kml.KML()
k.from_string(kml_string)
doc = list(k.features())
folder = list(doc[0].features())
placemarks = list(folder[0].features())

ex_data = list(placemarks[0].extended_data.elements)[0]
for dat in ex_data._data:
    if dat['name'] == 'NAME':
        county_name = dat['value'].strip()
        break

print(county_name)

# Get county names and FIPS codes
# county_names = []
# county_fips = []
# for feature in features:
#     county_names.append(feature.name)
#     county_fips.append(feature.description)

# Get county adjacency matrix
# county_adj = []
# for feature in features:
#     county_adj.append(feature.extended_data[0].value)

# print(county_adj)
