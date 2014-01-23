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

var arc_data = [{
    innerRadius: height/4,
    outerRadius: height/2.2,
    startAngle: 0,
    endAngle: (Math.PI*2)
}];


var arc = d3.svg.arc(),
    line = d3.svg.line();

var zone =
    canvas.selectAll('.arc')
        .data(arc_data)
        .enter()
        .append('path')
            .attr('class', 'arc')
            .attr('d', arc)
            .style('fill', 'none')
            .style('stroke', 'black')
            .style('stroke-width', 1);

var poly_data = [
    [[(height/4),(height/4)],
     [(height/4),-(height/4)],
     [-(height/4), -(height/4)],
     [-(height/4), (height/4)]]
];

var poly =
    canvas.selectAll('.poly')
        .data(poly_data)
        .enter()
        .append('path')
            .attr('class', 'poly')
            .attr('d', function(d) {
                return line(d) + 'Z';
            })
            .style('fill', 'none')
            .style('stroke', 'black')
            .style('stroke-width', 1);

var flux = (height/4),
    increment = 0.01,
    grow = 1;

d3.timer(function () {
    if (flux > (height/2.2)) {
        grow = 0;
    } else if (flux < (height/4)) {
        grow = 1;
    }

    if (grow) {
        flux += increment;
    } else {
        flux -= increment;
    }

    poly_data.forEach(function (points, pi) {
        points.forEach(function (d, i) {
            if (d[0] > 0) {
                d[0] = flux;
            } else {
                d[0] = -flux;
            }

            if (d[1] > 0) {
                d[1] = flux;
            } else {
                d[1] = -flux;
            }
        });
    });

    poly.attr('d', function (d) {
        return line(d) + 'Z';
    });
});