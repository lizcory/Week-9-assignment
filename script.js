const margin = {t: 50, r:50, b: 50, l: 50};
const size = {w: 1200, h: 700};
const svg = d3.select('svg#sankey');

svg.attr('width', size.w)
    .attr('height', size.h);

const containerG = svg.append('g')
    .classed('container', true)
    .attr('transform', `translate(${margin.t}, ${margin.l})`);
size.w = size.w - margin.l - margin.r;
size.h = size.h - margin.t - margin.b;

// downloaded this json from the observable site directly, 
// since I was having issues with sourcelinks and sourcenodes not showing the correct name property
d3.json('data/energy-2.json') 
    .then(function(data) {


    let sankeyData = prepareSankeyData(data);
    console.log(sankeyData);

    drawSankey(sankeyData);


});


function prepareSankeyData(data) {


    let links = data.links;    
    console.log(links);

    let nodes = data.nodes;
    
    console.log(nodes);
    return {nodes: nodes, links: links };

}

function drawSankey(data) {

    let sankeyLayout = d3.sankey()
        .nodeId(d => d.name)
        .nodeWidth(15)
        .nodePadding(15)
        .extent([ [0, 0], [size.w, size.h] ]);

    let sankey = sankeyLayout(data);

    // console.log(sankeyLayout(data));

    // make color function 
    let nodeColorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // draw nodes
    containerG.selectAll('rect')
        .data(sankey.nodes)
        .join('rect')
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1-d.x0)
        .attr('height', d => d.y1-d.y0)
        .attr('fill', d => nodeColorScale(d.category)); 

    // draw links
    containerG.selectAll('path')
        .data(sankey.links)
        .join('path')
        .attr('d', d3.sankeyLinkHorizontal())
        .attr('stroke-width', d => d.width);

    // draw labels
    containerG.selectAll('text')
        .data(sankey.nodes)
        .join('text') // text alignment from the referenced observable example
            .attr("x", d => d.x0 < size.w / 2 ? d.x1 + 6 : d.x0 - 6)
            .attr("y", d => (d.y1 + d.y0) / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", d => d.x0 < size.w / 2 ? "start" : "end")
            .text(d => d.name);
        // .text(d => d.name)
        // .attr('transform', d => `translate(${d.x0}, ${d.y0}) rotate(90)`);


}