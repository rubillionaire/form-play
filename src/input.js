
module.exports = function Input (wrapper) {

    var input = {};

    var data = [{
        prev_visible: 1,
        visible: 1,
        name: 'CTR Site',
        note: 'Goal is to make this jam killer to sell stuff.'
    }, {
        prev_visible: 1,
        visible: 1,
        name: 'Rock climb',
        note: 'Make the hike.'
    }];


    input.el =
        wrapper.append('input')
            .attr('placeholder', 'Search/Create')
            .attr('class', 'search')
            .on('keyup', function () {
                var search_for = d3.select(this)
                                   .node()
                                   .value
                                   .toLowerCase();

                input.list.data().forEach(function(d, i) {
                    d.prev_visible = d.visible;

                    if (search_for.length < 1) {
                        d.visible = 1;
                        return;
                    }

                    d.visible = 0;
                    if (d.name.toLowerCase()
                              .indexOf(search_for) > -1) {

                        d.visible = 1;

                    } else if (d.note
                                .toLowerCase()
                                .indexOf(search_for) > -1) {
                        d.visible = 1;
                    }
                });

                input
                    .list
                    .transition()
                    .duration(800)
                    .style('opacity', function (d) {
                        if (d.visible) {
                            return 1.0;
                        } else {
                            return 0.2;
                        }
                    })
                    .styleTween('left', function (d) {
                        if (d.prev_visible !== d.visible) {
                            var i;
                            if (d.visible) {
                                i = d3.interpolateRound(100, 0);
                                return function (t) {
                                    return i(t) + '%';
                                };
                            } else {
                                i = d3.interpolateRound(0, 100);
                                return function (t) {
                                    return i(t) + '%';
                                };
                            }

                        }
                    })
                    .each('start', function (d, i) {
                        if (d.prev_visible === 0) {
                            if (d.visible) {
                                d3.select(this)
                                    .style('display', 'list-item');
                            } else {
                                d3.select(this)
                                    .style('display', 'none');
                            }
                        } 
                    })
                    .each('end', function (d, i) {
                        if (d.visible) {
                            d3.select(this)
                                .style('display', 'list-item');
                        } else {
                            d3.select(this)
                                .style('display', 'none');
                        }
                    });

                // set and remove items in list
                update_display();
            });



    var list_ul = wrapper.append('div')
                        .attr('class', 'list')
                        .append('ul');

    input.list =
        list_ul.selectAll('list_el')
               .data(data);

    input.list
        .enter()
        .append('li')
            .append('div')
            .attr('class', 'list-item')
            .call(function (sel) {
                sel.append('h3')
                    .attr('class', 'list-name')
                    .text(function (d) {
                        return d.name;
                    });

                sel.append('p')
                    .attr('class', 'list-note')
                    .text(function (d) {
                        return d.note;
                    });
            });

    return input;
}