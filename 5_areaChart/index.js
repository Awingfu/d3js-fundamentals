const svg = d3.select('svg');

const height = +svg.attr('height'); //+ === parseFloat
const width = +svg.attr('width');

const render = data => {
  const title = "Population over Year";
  const xValue = d => d.year;
  const xAxisLabel = 'Year';
  const yValue = d => d.population;
  const yAxisLabel = 'Population';
  const margin = {
    top: 60,
    right: 40,
    bottom: 80,
    left: 120,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([innerHeight, 0])
    .nice();
  
  const g = svg.append('g')
    .attr('transform',`translate(${margin.left}, ${margin.top})`);

  const xAxis = d3.axisBottom(xScale)
    .ticks(6)
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

  const yAxisTickFormat = number => 
    d3.format('.1s')(number)
      .replace('G','B');

  const yAxis = d3.axisLeft(yScale)
    .tickFormat(yAxisTickFormat)
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

  const areaGenerator = d3.area()
    .x(d => xScale(xValue(d)))
    .y0(innerHeight)
    .y1(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

  g.append('path')
    .attr('class', 'line-path')
    .attr('d', areaGenerator(data));
  
  g.append('text')
    .attr('class', 'title')
    .attr('y', -20)
    .attr('x', innerWidth / 2)
    .style('text-anchor','middle')
    .text(title);
}

d3.csv('https://vizhub.com/curran/datasets/world-population-by-year-2015.csv').then(data => {
  data.forEach(d => {
    d.year = new Date(d.year);
    d.population = +d.population;
  });
  // console.log(data)
  render(data);
});