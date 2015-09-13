# Download and Transform the 1:10m Admin 0 Shapefiles from Natural Earth

URL = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_map_subunits.zip

# Download the zip file from the Natural Earth server
ne_10m_admin_0_map_subunits.zip:
	curl -LO $(URL)

# Unzip the shapefiles
ne_10m_admin_0_map_subunits.shp: ne_10m_admin_0_map_subunits.zip
	unzip ne_10m_admin_0_map_subunits.zip
	touch ne_10m_admin_0_map_subunits.shp

# Convert the shapefiles to GeoJSON
usa.json: ne_10m_admin_0_map_subunits.shp
	ogr2ogr -f GeoJSON usa.json -where "ADM0_A3 IN ('USA')" ne_10m_admin_0_map_subunits.shp

# Remove source and temporary files
clean:
	rm ne_10m_admin_0_map_subunits*
