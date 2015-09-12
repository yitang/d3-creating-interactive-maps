---
layout: default
---

# Creating a Simple Map

<div id="simple-map-container"></div>

<script src="{{site.baseurl}}/assets/js/libs/d3.js"></script>

<script>
  // Create a selection for the map container
  var div = d3.select('#simple-map-container');

  // Configure the map size and projection
  var width = 800,
      height = 400;

  // Create and configure the projection
  var projection = d3.geo.equirectangular()
    .translate([width / 2, height / 2]);

  // Configure the path generator
  var pathGenerator = d3.geo.path()
    .projection(projection);

  // Construct the GeoJSON URL
  var geoJsonUrl = '{{site.baseurl}}/assets/data/cultural-1-50m/countries.json';

  // Load and parse the GeoJSON file asynchronously
  d3.json(geoJsonUrl, function(error, data) {

    // Handle errors getting or parsing the GeoJSON file
    if (error) {
      console.error(error);
      throw error;
    }

    var svg = div.selectAll('svg.map').data([data]);

    svg.enter().append('svg')
      .classed('map', true);

    svg
      .attr('width', width)
      .attr('height', height);

    svg.exit().remove();

    var countries = svg.selectAll('path.country').data([data]);

    countries.enter().append('path')
      .classed('country', true);

    countries
      .attr('d', pathGenerator);

    countries.exit().remove();
});

</script>


## Step by Step

- First, we define the size of our map
- We create a _projection_
- We create and configure the _path generator_
- We load the GeoJSON data
- We create a selection for the `path` elements and bind them to the GeoJSON data
- We use the path generator to compute the SVG path string
