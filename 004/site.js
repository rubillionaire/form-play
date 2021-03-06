// where does it live
var canvas_wrapper = d3.select('.canvas'),
    margin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

// what does it look like
var size = 10,
    radius = size/2,
    space = size*4;

// where to show stuff
// based on space available, and size
var cols = Math.floor(width / space),
    rows = Math.floor(height / space);

// what to show
var data = d3.range(rows*cols).map(function (n, i) {

    var cur_row = Math.floor(i/cols),
        cur_col = i - (cur_row * cols);

    return {
        x: cur_col * space,
        y: cur_row * space,
        r: radius
    };
});

var canvas =
        canvas_wrapper.append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
                .attr('width', width)
                .attr('height', height)
                .attr('transform',
                        'translate(' +
                        margin.top + ',' + margin.left + ')');

canvas.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', function (d) {
        return d.r;
    })
    .attr('cx', function (d) {
        return d.x;
    })
    .attr('cy', function (d) {
        return d.y;
    })