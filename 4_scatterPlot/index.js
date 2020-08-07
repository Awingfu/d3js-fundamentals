const svg = d3.select('svg');

const height = +svg.attr('height'); //+ === parseFloat
const width = +svg.attr('width');

const render = data => {
  const xValue = d => d.population
  const yValue = d => d.country
  const margin = {
    top: 50,
    right: 40,
    bottom: 70,
    left: 250,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)]) //map data range to screen range
    .range([0, innerWidth])
    .nice();

  const yScale = d3.scalePoint() // scalePoint for circles
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1); // padding between bars
  
  const g = svg.append('g')
    .attr('transform',`translate(${margin.left}, ${margin.top})`);

  const xAxisTickFormat = number => 
    d3.format('.3s')(number)
      .replace('G', 'B');
  const xAxis = d3.axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight);

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth);

  g.append('g')
    .call(yAxis)
    .selectAll('.domain')
      .remove();
  
  const xAxisGroup = g.append('g').call(xAxis)
    .attr('transform',`translate(0, ${innerHeight})`);
  
  xAxisGroup.selectAll('.domain').remove();
  xAxisGroup.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 50)
    .attr('fill', 'black')
    .text('Population')

  g.selectAll('circle').data(data)
    .enter().append('circle')
    .attr('cy', d => yScale(yValue(d)))
    .attr('cx', d => xScale(xValue(d)))
    .attr('r', 15);
  
  g.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .text('Top Most Populous Countries');
}

d3.csv('worldPop.csv').then(data => {
  data.forEach(d => d.population = +d.population)
  render(data.slice(0,10));
});