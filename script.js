const margin = {t: 50, r:50, b: 50, l: 50};
const size = {w: 1000, h: 800};
const svg = d3.select('svg#parallel');

svg.attr('width', size.w)
    .attr('height', size.h);

const containerG = svg.append('g')
    .classed('container', true)
    .attr('transform', `translate(${margin.t}, ${margin.l})`);
size.w = size.w - margin.l - margin.r;
size.h = size.h - margin.t - margin.b;

d3.json('data/energy.json')
.then(function(data) {
    
});
