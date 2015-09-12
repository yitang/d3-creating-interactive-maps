---
layout: default
---

# Geographic Projections

In the previous sections, we learned how to use the equirectangular projection and the path generator to create a simple world map, and how to add some styles to it. In this section, we will explore _projections_.

## What is a Projection?

Short answer: A function that takes `(longitude, latitude)` and returns `(x, y)` (pixels, for instance).

### Long Answer

Earth is shaped more or less like a sphere of radius 6,371 km (3,959 miles). We can describe a point on Earth’s surface by two coordinates, _longitude_ and _latitude_.

- **Longitude** the angle between any line from pole to pole (Greenwich), the center of the Earth and the point.
- **Latitude** The angle between the Equator, the center of the Earth and the point.

IMAGE

A projection is a function that takes `(longiture, latitude)` and returns coordinates `(x, y)` that allow to represent points on Earth (or any other sphere) in a plane surface. There are many projections, each one or more specific problems of other projections.

For example, see [The West Wing: Gall-Peters Projection](https://www.youtube.com/embed/vVX-PrBRtTY), also see [xkcd: What Your Favorite Map Projection Says Sbout You](https://xkcd.com/977/).

https://github.com/mbostock/d3/wiki/Geo-Projections

#### Equirectangular Projection

{% highlight js %}
// https://github.com/mbostock/d3/blob/master/src/geo/equirectangular.js#L4
function d3_geo_equirectangular(λ, φ) {
  return [λ, φ];
}
{% endhighlight %}

#### Mercator Projection


{% highlight js %}
// https://github.com/mbostock/d3/blob/master/src/geo/mercator.js#L5
function d3_geo_mercator(λ, φ) {
  return [λ, Math.log(Math.tan(π / 4 + φ / 2))];
}
{% endhighlight %}

#### Conic Conformal

{% highlight js %}
// https://github.com/mbostock/d3/blob/master/src/geo/conic-conformal.js#L7
function d3_geo_conicConformal(φ0, φ1) {
  var cosφ0 = Math.cos(φ0),
      t = function(φ) { return Math.tan(π / 4 + φ / 2); },
      n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)),
      F = cosφ0 * Math.pow(t(φ0), n) / n;

  if (!n) return d3_geo_mercator;

  function forward(λ, φ) {
    if (F > 0) { if (φ < -halfπ + ε) φ = -halfπ + ε; }
    else { if (φ > halfπ - ε) φ = halfπ - ε; }
    var ρ = F / Math.pow(t(φ), n);
    return [
      ρ * Math.sin(n * λ),
      F - ρ * Math.cos(n * λ)
    ];
  }

  forward.invert = function(x, y) {
    var ρ0_y = F - y,
        ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
    return [
      Math.atan2(x, ρ0_y) / n,
      2 * Math.atan(Math.pow(F / ρ, 1 / n)) - halfπ
    ];
  };

  return forward;
}
{% endhighlight %}

Let’s skip the math, but please note that these functions will take two arguments, longitude and latitude, and return an array of two elements, horizontal and vertical position.
