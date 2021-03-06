// where does it live
var canvas_wrapper = d3.select('.canvas'),
    margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

// what does it look like
var size = 5,
    radius = size/2;

// where to show stuff
// based on space available, and size
var cols = Math.floor(width / size),
    rows = Math.floor(height / size),
    opacity_cols =
        d3.scale.linear().domain([0, cols/2, cols]).range([0.5, 0.0, 0.5]),
    opacity_rows =
        d3.scale.linear().domain([0, rows/2, rows]).range([0.5, 0.0, 0.5]);

// what to show
var data = d3.range(rows*cols).map(function (n, i) {

    var cur_row = Math.floor(i/cols),
        cur_col = i - (cur_row * cols);

    return {
        x: cur_col * size,
        y: cur_row * size,
        r: radius,
        o: opacity_cols(cur_col) + opacity_rows(cur_row)
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
    .attr('opacity', function (d) {
        return d.o;
    });