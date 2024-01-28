
county_adj.json: cb_2022_us_county_500k.kml
	poetry install
	poetry run python3 county_adj.py
	prettier --write county_adj.json

cb_2022_us_county_500k.kml: cb_2022_us_county_500k.zip
	unzip -n cb_2022_us_county_500k.zip

cb_2022_us_county_500k.zip:
	wget https://www2.census.gov/geo/tiger/GENZ2022/kml/cb_2022_us_county_500k.zip

clean:
	rm -rf cb_2022_us_county_500k.* county_adj.json
