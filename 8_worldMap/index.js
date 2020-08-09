const svg = d3.select("svg");

const height = document.body.clientHeight;
const width = document.body.clientWidth;

svg
    .attr('width', width)
    .attr('height', height)
  .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('rx', 40)

// const projection = d3.geoMercator();
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);
const g = svg.append('g');

g.append('path')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({type: 'Sphere'}))

g.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform);
  }));

Promise.all([
  d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
  d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
]).then(([tsvData, topoJSONData]) => {
  const countryName = tsvData.reduce((acc, d) => {
    acc[d.iso_n3] = d.name;
    return acc;
  }, {});

  const countries = topojson.feature(topoJSONData, topoJSONData.objects.countries);

  g.selectAll('path')
    .data(countries.features)
    .enter().append('path')
      .attr('class', 'country')
      .attr('d', d => pathGenerator(d))
    .append('title')
      .text(d => countryName[d.id]);

})
