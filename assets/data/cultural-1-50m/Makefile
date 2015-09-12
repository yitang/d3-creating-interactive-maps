# Download and Transform the 1:50m Country Shapefiles from Natural Earth
# http://www.naturalearthdata.com/downloads/50m-cultural-vectors/

URL = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_0_countries.zip

# Download the zip file from the Natural Earth server
ne_50m_admin_0_countries.zip:
	curl -LO $(URL)

# Unzip the shapefiles
ne_50m_admin_0_countries.shp: ne_50m_admin_0_countries.zip
	unzip ne_50m_admin_0_countries.zip
	touch ne_50m_admin_0_countries.shp

# Convert the shapefiles to GeoJSON
countries.json: ne_50m_admin_0_countries.shp
	ogr2ogr -f GeoJSON countries.json ne_50m_admin_0_countries.shp

# Convert the GeoJSON file to TopoJSON
countries.topojson: countries.json
	topojson -p -o countries.topojson countries.json

# Remove source and temporary files
clean:
	rm ne_50m_admin_0_countries*
