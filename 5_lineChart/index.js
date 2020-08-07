const svg = d3.select('svg');

const height = +svg.attr('height'); //+ === parseFloat
const width = +svg.attr('width');

const render = data => {
  const title = "SF: Temperature vs Time";
  const xValue = d => d.timestamp;
  const xAxisLabel = 'Time';
  const yValue = d => d.temperature;
  const yAxisLabel = 'Temperature';
  const margin = {
    top: 60,
    right: 40,
    bottom: 80,
    left: 120,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const circleRadius = 5;

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();
  
  const g = svg.append('g')
    .attr('transform',`translate(${margin.left}, ${margin.top})`);

  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(20);
  
  const xAxisGroup = g.append('g').call(xAxis)
    .attr('transform',`translate(0, ${innerHeight})`);
  
  xAxisGroup.selectAll('.domain').remove();
  xAxisGroup.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 70)
    .attr('fill', 'black')
    .text(xAxisLabel)

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

  const yAxisGroup = g.append('g').call(yAxis);

  yAxisGroup.selectAll('.domain').remove();
  yAxisGroup.append('text')
    .attr('class', 'axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y', -75)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .style('text-anchor','middle')
    .text(yAxisLabel)

  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveBasis); // smooths lines

  g.append('path')
    .attr('class', 'line-path')
    .attr('d', lineGenerator(data));

  // g.selectAll('circle').data(data)
  //   .enter().append('circle')
  //   .attr('cy', d => yScale(yValue(d)))
  //   .attr('cx', d => xScale(xValue(d)))
  //   .attr('r', circleRadius);
  
  g.append('text')
    .attr('class', 'title')
    .attr('y', -20)
    .attr('x', innerWidth / 2)
    .style('text-anchor','middle')
    .text(title);
}

d3.csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv').then(data => {
  data.forEach(d => {
    d.temperature = +d.temperature;
    d.timestamp = new Date(d.timestamp);
  });
  // console.log(data)
  render(data);
});