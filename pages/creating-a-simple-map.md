---
layout: default
---

# Creating a Simple Map

The basic skill to create map-based visualizations is being able to draw a simple map. In order to do this, we don’t need to know much, but at least:

- Some SVG
- Projections
- Path Generators
- Basic D3
- CSS

<style>
#world-map svg {
  background-color: #4A4456;
}
.countries {
  fill: #3B9FB6;
}
</style>


<div id='world-map' class='figure'></div>

<script src="{{site.baseurl}}/assets/js/libs/d3.js"></script>

<script>
(function() {
  // Create a selection for the map container
  var div = d3.select('#world-map');

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

    var countries = svg.selectAll('path.countries').data([data]);

    countries.enter().append('path')
      .classed('countries', true);

    countries
      .attr('d', pathGenerator);

    countries.exit().remove();
  });  
})();
</script>


## Step by Step

- First, we define the size of our map
- We create a _projection_
- We create and configure the _path generator_
- We load the GeoJSON data
- We create a selection for the `path` elements and bind them to the GeoJSON data
- We use the path generator to compute the SVG path string

Some things worth noting:

The map above will only generate one big path, corresponding to the countries `FeatureCollection`. We can’t give individual countries different colors, because they are all drawn in one `path` element.

## Creating Multiple Paths

<style>
#countries-map svg {
  background-color: #4A4456;
}
#countries-map .country {
  fill: #3B9FB6;
  stroke-width: 1px;
  stroke: #4A4456;
}
</style>

<div id='countries-map' class='figure'></div>

<script>
(function() {
  // Create a selection for the map container
  var div = d3.select('#countries-map');

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

    var countries = svg.selectAll('path.country').data(data.features);

    countries.enter().append('path')
      .classed('country', true);

    countries
      .attr('d', pathGenerator);

    countries.exit().remove();
  });
})();
</script>

A `FeatureCollection` has an attribute `features`, which contains one or more `Features` or `FeatureCollection` objects. In this case, the `features` array contains one item per country.

Ok, but who cares?

We, because if we have different `path` elements, we can manipulate them individually, adding custom styles, borders and the like.

## Custom Styles

<style>
#countries-map-styles svg {
  background-color: #4A4456;
}
#countries-map-styles .country {
  fill: #3B9FB6;
  stroke-width: 1px;
  stroke: #4A4456;
}

#countries-map-styles .africa {
  fill: #EDC951;
}
</style>

<div id='countries-map-styles' class='figure'></div>

<script>
(function() {
  // Create a selection for the map container
  var div = d3.select('#countries-map-styles');

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

    var countries = svg.selectAll('path.country').data(data.features);

    countries.enter().append('path')
      .classed('country', true)
      .each(function(d) {
        var continent = d.properties.continent.toLowerCase();
        d3.select(this).classed(continent, true);
      });

    countries
      .attr('d', pathGenerator);

    countries.exit().remove();
  });
})();
</script>
