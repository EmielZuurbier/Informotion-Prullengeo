var height = 400,
    width = 500,
    barWidth = 50,
    barOffset = 5;

var tempColor;

var yScale = d3.scale.linear()
        .domain([0, 125])
        .range([0, height]);

var xScale = d3.scale.ordinal()
        .domain(d3.range(0, bardata.length))
        .rangeBands([0, width])

d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#C9D7D6')
    .selectAll('rect').data(dataArray)
    .enter().append('rect')
        .style('fill', function(d,i) {
            return colors(i);
        })
        .attr('width', xScale.rangeBand()).attr('height', function(d) {
            return yScale(d);
        })
        .attr('x', function(d,i) {
            return xScale(i);
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })

    .on('mouseover', function(d) {
        tempColor = this.style.fill;
        d3.select(this)
            .style('opacity', .5)
            .style('fill', 'yellow')
    })

    .on('mouseout', function(d) {
        d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor)
    })
