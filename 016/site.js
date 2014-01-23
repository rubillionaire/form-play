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

var canvas =
        canvas_wrapper.append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
                .attr('width', width)
                .attr('height', height)
                .attr('transform',
                        'translate(' +
                        (width/2) + ',' + (height/2) + ')');

var circles,
    data = [{
        key: 0,
        start: 0,
        end: height/2,
        cx: 0,
        incx: 1,
        cy:0,
        incy: 1
    }];

circles = canvas.selectAll('circle')
    .data(data, function (d) { return d.key; })
    .enter()
    .append('circle')
    .attr('cx', function (d) {
        return d.cx;
    })
    .attr('cy', function (d) {
        return d.cy;
    })
    .attr('r', 5);

d3.timer(function () {

    circles
        .attr('cx', function (d) { return d.cx; })
        .attr('cy', function (d) { return d.cy; });

    data.forEach(function (d, i) {
        d.cx += d.incx;
        d.cy += d.incy;
        if (d.cx > d.end) {
            d.cx = 0;
        }
        if (d.cy > d.end) {
            d.cy = 0;
        }
    });
});