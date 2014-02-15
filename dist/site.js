;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])
;