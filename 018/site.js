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

var data = [{
        key: 0,
        cx: 0,
        incx: function (c) {
            return Math.sin(c);
        },
        cy:0,
        incy: function (c) {
            return Math.cos(c);
        },
        rx: function (c) {
            return (Math.sin(c) * 30) + 30;
        },
        ry: function (c) {
            return (Math.cos(c) * 30) + 30;
        }
    }],
    count = 0,
    flux = 0,
    flux_delta = ((Math.PI*2)/1000);

var circles = canvas.selectAll('circle')
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
    flux += flux_delta;

    if (flux >= (Math.PI*2)) flux = 0;

    circles
        .attr('cx', function (d) { return d.cx; })
        .attr('cy', function (d) { return d.cy; });

    data.forEach(function (d, i) {
        d.cx += (d.incx(flux) * d.rx(flux));
        d.cy += (d.incy(flux) * d.ry(flux));
        if ((Math.abs(d.cx) > width/2) ||
            (Math.abs(d.cy) > height/2)) {
            d.cx = 0;
            d.cy = 0;
        }
    });
});