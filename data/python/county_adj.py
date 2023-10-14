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
geoid_to_name = {}
# Dictionary of point to set of GEO IDs
point_to_geoids = {}

for placemark in placemarks:
    geo_id = None
    county_name = None
    state_name  = None
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
    geoid_to_name[geo_id] = county_name + ', ' + state_name
    print(geo_id, geoid_to_name[geo_id])
 
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

# Dictionary of GEO ID to set of GEO IDs
adj = {}
for point in point_to_geoids:
    geoids = point_to_geoids[point]
    for geoid1 in geoids:
        if geoid1 not in adj:
            adj[geoid1] = set()
        for geoid2 in geoids:
            if geoid1 != geoid2:
                adj[geoid1].add(geoid2)

print("writing out adjacency matrix")
with open('county_adj.txt', 'w') as out_file:
    for geoid1 in adj:
        for geoid2 in adj[geoid1]:
            out_file.write(geoid1 + '\t' + geoid2 + '\n')

print("writing out GEO ID to county name")
with open('geoid_to_name.txt', 'w') as out_file:
    for geoid in geoid_to_name:
        out_file.write(geoid + '\t' + geoid_to_name[geoid] + '\n')

print("done")
