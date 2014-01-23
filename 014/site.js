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
    innerRadius: 20,
    outerRadius: 40,
    startAngle: 0,
    endAngle: (Math.PI*2)
}];

var flux = 0,
    flux_delta = ((Math.PI*2)/1000);

var arc = d3.svg.arc();

var zone =
    canvas.selectAll('.arc')
        .data(data)
        .enter()
        .append('path')
            .attr('class', 'arc')
            .attr('d', arc);

d3.timer(function () {
    flux += flux_delta;

    if (flux >= (Math.PI*2)) flux = 0;

    data.forEach(function (d, i) {
        d.innerRadius = 20 + (Math.sin(flux) * 20);
        d.outerRadius = 40 + (Math.sin(flux) * 40);
    });

    zone.attr('d', arc);
});