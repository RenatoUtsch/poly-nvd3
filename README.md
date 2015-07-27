Poly-NVD3
=========
This project enables using [NVD3](https://github.com/novus/nvd3) as web
components through Polymer.

Installation
============
You can install Poly-NVD3 with bower or download it from this repository
directly.

To install with bower, just run the following command on your project (the $
symbolizes the user shell):
```bash
$ bower install --save poly-nvd3
```

This command will also save the poly-nvd3 dependency on your project on your
bower.json file.

Please note that Bower will also install poly-nvd3’s dependencies, like d3,
Polymer and nvd3.

Migration
=========
The following breaking change happened between the 1.2.x and 1.3.x versions:
- The `customize` function was renamed to `onCreate`.

Usage
=====
To implement NVD3 charts using polymer, create a typical element (only on
javascript) and specify the NVD3Behavior and the NVD3 model:

**my-line-chart.html**
```html
<link rel="import" href="bower_components/polymer/polymer.html">
<link rel="import" href=”bower_components/poly-nvd3/nvd3-behavior.html">

<script>
    Polymer({
        is: "my-line-chart",
        nvModel: nv.models.lineChart,
        behaviors: [NVD3Behavior]
    });
</script>
```

Note that importing the nvd3-behavior file also imports d3 and nvd3. After that,
just import your chart and profit!

```html
<!doctype html>
<html>
<head>
    <meta charset=”utf-8”>
    <title>Poly-NVD3</title>

    <script src=”bower_components/webcomponentsjs/webcomponents-lite.min.js” type=”text/javascript”></script>
    <link rel=”import” href=”my-line-chart.html”>
</head>
<body>
    <my-line-chart url=”my-data.json”></my-line-chart>
</body>
</html>
```

### Specifying data
To specify the data to be used on your charts you have two ways: you can use
the *data* or the *url* attributes.

The *url* attribute is used when you want to get your data from a request. You
can specify the request URL in the *url* attribute and the request parameters in
the *params* attribute, in the same way as when you create an
[iron-ajax](https://elements.polymer-project.org/elements/iron-ajax) element:

```html
<my-line-chart url=”http://example.com/api/line-chart-data” params=’{“alt”: “json”}’></my-line-chart>
```

If instead you already have the data you want to display, you can create the
chart element specifying the data directly:

**my-data-element.html**
```html
<link rel="import" href="bower_components/polymer/polymer.html">
<link rel="import" href=”bower_components/poly-nvd3/nvd3-behavior.html">

<script>
    Polymer({
        properties: {
            data: {
                type: Object,
                value: function() {
                    return [
                        {
                            “key”: “Line 1”,
                            “values”: [
                                {“x”: 0, “y”: 1},
                                {“x”: 1, “y”: 2},
                                {“x”: 2, “y”: 3}
                            ]
                        }
                    ]
                }
            }
        },
        is: "my-line-chart",
        nvModel: nv.models.lineChart,
        behaviors: [NVD3Behavior]
    });
</script>

```

Then, when creating your chart, you don’t have to specify anything else:

```html
<!doctype html>
<html>
<head>
    <meta charset=”utf-8”>
    <title>Poly-NVD3</title>

    <script src=”bower_components/webcomponentsjs/webcomponents-lite.min.js” type=”text/javascript”></script>
    <link rel=”import” href=”my-data-element.html”>
</head>
<body>
    <my-line-chart></my-line-chart>
</body>
</html>
```

Also, please note that the *data*, *url* and *params* attributes have watchers on
them. This means that if you change any of these attributes after the page has
been created the chart will automatically be updated with the new data from the
*data* attribute or from the request to the given *url*.

### Chart size
You can specify *width*, *height* and *fit* attributes for the chart to control its
width and height.

By default, if you don’t specify any of these parameters, the chart will
automatically take all the width of its parent element and set the height to
be the width divided by the golden ratio, what will give a pleasant appearance
to the chart’s size. If the parent element doesn’t have a width, the chart will
use a default of 1000 pixels.

If you specify the fit attribute, the chart will take the maximum space
available for both its width and height instead of using the golden ratio for
the height.

You can override the width and height to a constant value by specifying the
*width* and *height* attributes. Some examples:

```html
<my-line-chart width=”1500” height=”600”></my-line-chart>
```
This chart will be created with constant width and height of 1500 and 600
pixels, respectively.

```html
<my-line-chart width=”1200” fit></my-line-chart>
```
This chart will be created with a constant width of 1200 pixels and the height
will be all the available space from its parent div.

```html
<my-line-chart width=”1600”></my-line-chart>
```
This chart will have a constant width of 1600 pixels and a height of
`width / (golden ratio)`.

```html
<my-line-chart fit></my-line-chart>
```
This chart will take the maximum space available for both its width and height.

The *width*, *height* and *fit* attributes also have watchers on them. If you change
them, the chart will update accordingly. To disable the *width* and *height*
attributes, remove them or set them to 0.

If the width or height are not specified, the chart is responsive. This means
that if the parent element of the chart changes its width or height, the chart
will update itself accordingly.

### Customizing
To customize the NVD3 chart to your needs, you can implement the `onCreate`
function when creating your chart element:

```html
<link rel="import" href="bower_components/polymer/polymer.html">
<link rel="import" href=”bower_components/poly-nvd3/nvd3-behavior.html">

<script>
    Polymer({
        is: "my-line-chart",
        nvModel: nv.models.lineChart,
        behaviors: [NVD3Behavior],
        onCreate: function(chart, svg) {
            /* Customize your chart and svg here. */
            chart.useInteractiveGuideline(true);
            chart.xAxis.axisLabel(“Time (seconds)”);
        }
    });
</script>
```

The `onCreate` function will be called inside the `nv.addGraph` function, after
creating the chart model and before setting up the chart resize method
(Poly-NVD3 uses [Resizer](https://github.com/alefwmm/Resizer), which is better
than nv.utils.windowResize). Poly-NVD3 takes care of setting up the responsive
chart with the data you specified and lets you configure the chart the way you
want.

If you want to set configurations after the chart is created, you can implement
the `afterCreate` function:

```html
<link rel="import" href="bower_components/polymer/polymer.html">
<link rel="import" href=”bower_components/poly-nvd3/nvd3-behavior.html">

<script>
    Polymer({
        is: "my-line-chart",
        nvModel: nv.models.lineChart,
        behaviors: [NVD3Behavior],
        afterCreate: function(chart, svg) {
            /* Customize what you want after creating the chart. */
            chart.interactiveLayer.dispatch.on('elementMousemove', function(d) {
                alert(“Moving through the elements on the chart.”);
            });
        }
    });
</script>
```

You can also change configurations before and after the chart is resized, by
implementing the `beforeResize` and `afterResize` functions, respectively. For
example:

```html
<link rel="import" href="bower_components/polymer/polymer.html">
<link rel="import" href=”bower_components/poly-nvd3/nvd3-behavior.html">

<script>
    Polymer({
        is: "my-line-chart",
        nvModel: nv.models.lineChart,
        behaviors: [NVD3Behavior],
        onCreate: function(chart, svg) {
            chart.useInteractiveGuideline(true);
            chart.xAxis.axisLabel(“Time (seconds)”);
        },
        afterResize: function(chart, svg) {
            // Highlight Y Zero.
            svg
                .select(".nv-y .nv-axis .zero line")
                .style("stroke", "#555");
        }
    });
</script>
```
