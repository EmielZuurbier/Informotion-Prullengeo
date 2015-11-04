/*global d3, console, alert*/

window.onload = function () {
    "use strict";

var it = 0,

    height = 400,
    width = 400,
    barWidth = 50,
    barOffset = 5,
    color = "ff000f",
    tempColor;

var colors = d3.scale.linear()
        .domain([0, dataOutput.length])
        .range([color, color]),



    // SCHAAL OM DE BARS UIT TE REKKEN TOT DE MAXIMALE HOOGTE
    yScale = d3.scale.linear()
        .domain([0, d3.max(dataOutput)])
        .range([0, height]),



    // SCHAAL OM DE BARS UIT TE REKKEN TOT DE MAXIMALE BREEDTE
    xScale = d3.scale.ordinal()
        .domain(d3.range(0, dataOutput.length))
        .rangeBands([0, width]),



    // D3 SELECTOR
    canvas = d3.selectAll('#chart')
        .append('svg')
        .attr('width', "100%")
        .attr('height', height)
//            .attr('width', "100%")
//            .attr('height', "100%")
//            .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
//            .attr('preserveAspectRatio','xMinYMin')
        .attr('class', 'chart')
        .style('background', '#f7f7f7')
        .append('g'),

    tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#f7f7f7')
        .style('color', '#999999')
        .style('opacity', '0');



canvas.selectAll('rect')
    .data(dataOutput)
    .enter()
    .append('rect')
        .style('fill', function (d, i) { return colors(i); })
        .attr('width', xScale.rangeBand())
        .attr('x', function (d, i) { return xScale(i); })
        .attr('height', 0)
        .attr('y', height)

    // MOUSE OVER OM KLEUR TE VERANDEREN
    .on('mouseover', function (d) {
        tooltip.transition()
            .style('opacity', '1');
        tooltip.html(d)
            .style('left', (d3.event.pageX + 40) + 'px')
            .style('top', (d3.event.pageY) + 'px');
        // DE HUIDIGE KLEUR OPSLAAN
        tempColor = this.style.fill;
        d3.select(this)
            .transition()
            .style('fill', '#222222');
    })
    // MOUSE OUT OM DE KLEUR TERUG TE VERANDEREN
    .on('mouseout', function (d) {
        tooltip.transition()
            .style('opacity', '0');
        tooltip.html('');
        d3.select(this)
            .transition().duration(500)
            // DE ORGINELE KLEUR WEER HERSTELLEN
            .style('fill', tempColor);
    });


// ANIMATIE OM DE BARS IN TE LATEN VLIEGEN
canvas.selectAll('rect').transition().duration(800)
    .attr('height', function (d) { return yScale(d); })
    .attr('y', function (d) { return height - yScale(d); })
    .delay(function (d, i) {
        return i * 20;
    })
    .ease('elastic');


var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .ticks(10),

    yGuide = d3.select('svg').append('g');
yAxis(yGuide);
yGuide.attr('transform', 'translate(35, 10)')
    .style('fill', '#f7f7f7');



}; //Einde onload


// SCHAAL OM DE BARS UIT TE REKKEN TOT DE MAXIMALE HOOGTE
var yScale = d3.scale.linear()
        .domain([0, 125])
        .range([0, height]),


    // SCHAAL OM DE BARS UIT TE REKKEN TOT DE MAXIMALE BREEDTE
    xScale = d3.scale.ordinal()
        .domain(d3.range(0, dataArray.length))
        .rangeBands([0, width]),



    // D3 SELECTOR
    canvas = d3.selectAll('#chart')
        .append('svg')
        .attr('width', "100%")
        .attr('height', height)
        .attr('class', 'chart')
        .style('background', '#f7f7f7')
        .append('g'),

    tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#f7f7f7')
        .style('color', '#999999')
        .style('opacity', '0');



canvas.selectAll('rect')
    .data(dataArray)
    .enter()
    .append('rect')
        .style('fill', color)
        .attr('width', xScale.rangeBand())
        .attr('x', function (d, i) {  "use strict";  return xScale(i); })
        .attr('height', 0)
        .attr('y', height)

    // MOUSE OVER OM KLEUR TE VERANDEREN
    .on('mouseover', function (d) {
        "use strict";
        tooltip.transition()
            .style('opacity', '1');
        tooltip.html(d)
            .style('left', (d3.event.pageX + 40) + 'px')
            .style('top', (d3.event.pageY) + 'px');
        // DE HUIDIGE KLEUR OPSLAAN
        tempColor = this.style.fill;
        d3.select(this)
            .transition()
            .style('fill', '#222222');
    })
    // MOUSE OUT OM DE KLEUR TERUG TE VERANDEREN
    .on('mouseout', function (d) {
        "use strict";
        tooltip.transition()
            .style('opacity', '0');
        tooltip.html('');
        d3.select(this)
            .transition().duration(500)
            // DE ORGINELE KLEUR WEER HERSTELLEN
            .style('fill', tempColor);
    });


// ANIMATIE OM DE BARS IN TE LATEN VLIEGEN
canvas.selectAll('rect').transition().duration(800)
    .attr('height', function (d) { "use strict"; return yScale(d); })
    .attr('y', function (d) { "use strict"; return height - yScale(d); })
    .delay(function (d, i) {
        "use strict";
        return i * 20;
    })
    .ease('elastic');


var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .ticks(10),

    yGuide = d3.select('svg').append('g');
yAxis(yGuide);
yGuide.attr('transform', 'translate(35, 10)')
    .style('fill', '#f7f7f7');


