# Use Census Bureau KML to create US county adjacency matrix.
# https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html

from fastkml import kml
import pygeoif

print("reading in KML file")
with open('cb_2022_us_county_500k.kml', 'rb') as kml_file:
    kml_string = kml_file.read()

kml_string = kml_string.replace(b'xsd:string', b'string')
kml_string = kml_string.replace(b'xsd:double', b'double')

k = kml.KML()
k.from_string(kml_string)
doc = list(k.features())
folder = list(doc[0].features())
placemarks = list(folder[0].features())

print("read in", len(placemarks), "counties")

# Dictionary of GEO ID to county name
geoid_to_dict = {}
# Dictionary of point to set of GEO IDs
point_to_geoids = {}

for placemark in placemarks:
    geo_id = None
    county_name = None
    state_name = None
    ex_data = list(placemark.extended_data.elements)[0]
    for dat in ex_data._data:
        if dat['name'] == 'NAMELSAD':
            county_name = dat['value'].strip()
            continue
        if dat['name'] == 'GEOID':
            geo_id = dat['value'].strip()
            continue
        if dat['name'] == 'STATE_NAME':
            state_name = dat['value'].strip()
            continue
    geoid_to_dict[geo_id] = {'name': county_name + ', ' + state_name}
    print(geo_id, geoid_to_dict[geo_id])

    if type(placemark.geometry) == pygeoif.geometry.Polygon:
        geoms = [placemark.geometry]
    else:
        geoms = placemark.geometry.geoms

    for geom in geoms:
        for point in geom.exterior.coords:
            if point not in point_to_geoids:
                point_to_geoids[point] = set()
            point_to_geoids[point].add(geo_id)

print(len(point_to_geoids), "points")

for point in point_to_geoids:
    counties_at_point = point_to_geoids[point]
    for geoid1 in counties_at_point:
        if 'adj' not in geoid_to_dict[geoid1]:
            geoid_to_dict[geoid1]['adj'] = set()
        for geoid2 in counties_at_point:
            if geoid1 != geoid2:
                geoid_to_dict[geoid1]['adj'].add(geoid2)

# write out adjacency matrix as json
import json
def set_default(obj):
    if isinstance(obj, set):
        return list(obj)
    raise TypeError

with open('county_adj.json', 'w') as outfile:
    json.dump(geoid_to_dict, outfile, default=set_default)
    
print("done")
