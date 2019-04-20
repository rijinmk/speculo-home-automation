const xValue = d => new Date(d.time - 5 * 60 * 1000);
const xLabel = 'Time';
const yValue = d => d.temprature;
const yLabel = 'Temperature';
const margin = { left: 120, right: 30, top: 20, bottom: 120 };

const svg = d3.select('svg');
const width = svg.attr('width');
const height = svg.attr('height');
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
const xAxisG = g.append('g')
    .attr('transform', `translate(0, ${innerHeight})`);
const yAxisG = g.append('g');

xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 100)
    .text(xLabel);

yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y', -60)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabel);

const xScale = d3.scaleTime();
const yScale = d3.scaleLinear();

const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickPadding(15)
    .ticks(5)
    .tickSize(-innerHeight)


const yTicks = 5;
const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(yTicks)
    .tickPadding(15)
    .tickSize(-innerWidth);

const line = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

const row = d => {
    d.timestamp = new Date(d.time - 5 * 60 * 1000);
    d.temprature = +d.temprature;
    return d;
};

d3.csv('http://localhost:8000/graph.csv', row, data => {
    xScale
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth]);

    yScale
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice(yTicks);

    g.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 4)
        .attr('d', line(data));

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
});