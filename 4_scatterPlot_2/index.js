const svg = d3.select('svg');

const height = +svg.attr('height'); //+ === parseFloat
const width = +svg.attr('width');

const render = data => {
  const title = "Cars: Horsepower vs Weight";
  const xValue = d => d.horsepower;
  const xAxisLabel = 'Horsepower';
  const yValue = d => d.weight;
  const yAxisLabel = 'Weight';
  const margin = {
    top: 60,
    right: 40,
    bottom: 80,
    left: 120,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const circleRadius = 18;

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue)) // extent = [min,max]
    .range([0, innerWidth])
    .nice(); // makes max cutoff neat

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight])
    .nice();
  
  const g = svg.append('g')
    .attr('transform',`translate(${margin.left}, ${margin.top})`);

  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(20); // pushes away from axis
  
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

  g.selectAll('circle').data(data)
    .enter().append('circle')
    .attr('cy', d => yScale(yValue(d)))
    .attr('cx', d => xScale(xValue(d)))
    .attr('r', circleRadius);
  
  g.append('text')
    .attr('class', 'title')
    .attr('y', -20)
    .attr('x', innerWidth / 2)
    .style('text-anchor','middle')
    .text(title);
}

d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv').then(data => {
  data.forEach(d => {
    d.mpg = +d.mpg;
    d.cylinders = +d.cylinders;
    d.displacement= +d.displacement;
    d.horsepower = +d.horsepower;
    d.weight = +d.weight;
    d.acceleration = +d.acceleration;
    d.year = +d.year;
  });
  // console.log(data)
  render(data);
});