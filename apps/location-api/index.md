---
layout: application
---

<style>
.countries {
  fill: #ddd;
}

.location {
  fill: none;
  stroke: #951F2B;
  stroke-width: 2px;
}
</style>


# Where am I?

<button id='get-location'>Get Location</button>


<div id='map-container'></div>

<script src='{{site.baseurl}}/apps/location-api/app.js'></script>

<script>
var width  = 800,
    height = 400,
    geoData;

var div = d3.select('#map-container');

// Projection and Generator
var projection = d3.geo.equirectangular()
  .translate([width / 2, height / 2]);

var pathGenerator = d3.geo.path()
  .projection(projection);

var geoJsonUrl = '{{site.baseurl}}/assets/data/cultural-1-50m/countries.json';


d3.json(geoJsonUrl, function(error, data) {

  if (error) { throw error; }

  var svg = div.selectAll('svg.map').data([data]);

  svg.enter().append('svg')
    .classed('map', true);

  svg
    .attr('width', width)
    .attr('height', height);

  svg.exit().remove();

  // Create a group to hold the map
  var mapGroup = svg.selectAll('g.map').data([data]);

  mapGroup.enter().append('g')
    .classed('map', true);

  mapGroup.exit().remove();

  // Create the Paths
  var path = mapGroup.selectAll('path.countries').data([data]);

  path.enter().append('path')
    .classed('countries', true);

  path.attr('d', pathGenerator);

  path.exit().remove();

});


function updateMap(position) {

  if (!position) { return ; }

  var coords = position.coords,
      pos = projection([coords.longitude, coords.latitude]);

  var svg = div.select('svg.map');

  // Create a group to hold the location
  var locGroup = svg.selectAll('g.loc').data([pos]);

  locGroup.enter().append('g')
    .classed('loc', true);

  locGroup.exit().remove();  

  var rx = d3.max([Math.abs(pos[0], 0), Math.abs(pos[0] - width)]),
      ry = d3.max([Math.abs(pos[1], 0), Math.abs(pos[1] - height)]),
      rMax = d3.max([rx, ry]);

  // Create the circle
  var circle = locGroup.selectAll('circle.location').data([pos]);

  circle.enter().append('circle')
    .attr('r', rMax)
    .attr('cx', function(d) { return d[0]; })
    .attr('cy', function(d) { return d[1]; })
    .classed('location', true);

  circle.transition().duration(1e3)
    .ease('cubic')
    .attr('r', 4)
    .attr('fill', '#951F2B');

  circle.exit().remove();
}

d3.select('#get-location').on('click', function() {
  navigator.geolocation.getCurrentPosition(updateMap);
});

</script>
