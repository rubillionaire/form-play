var d3 = require('d3');

var canvas = d3.select('.canvas'),
    format = d3.format("03d"),
    entries = d3.range(1,25).map(function (n, i) {
        return {
            index: format(n) + "/index.html"
        };
    }),
    width = window.innerWidth,
    height = window.innerHeight;

canvas
    .selectAll('.entries')
    .data(entries)
    .enter()
    .append('div')
    .style('position', 'relative')
    .style('width', width + 'px')
    .style('height', height/2 + 'px')
    .attr('class', 'entries')
    .append('iframe')
    .attr('src', function (d) {
        return d.index;
    });