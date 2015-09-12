---
layout: default
---

# Getting and Transforming the Data

## Installing Software

The first step is to install [GDAL][gdal]

```
# Adapt to your operating system if needed
$ brew install gdal
```

we will also use [TopoJSON][topojson] (both the library and the command line tool)

```
# Install the `topojson` command line tool
$ npm install --global topojson
```

## Getting Geographic Data

We will use geographic data from [Natural Earth][natural-earth]





<!-- Reference Links -->

[gdal]: http://www.gdal.org/ "Geospatial Data Abstraction Library"
[ogr2org]: http://www.gdal.org/ogr2ogr.html "OGR Simple Features Library"
[natural-earth]: http://www.naturalearthdata.com/ "Natural Earth"
