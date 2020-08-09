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
let projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);
const g = svg.append('g');

g.append('path')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({type: 'Sphere'}))

g.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform);
  }));

render = () => {
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
}
render();

// maybe add reactivity to resizing https://stackoverflow.com/questions/14265112/d3-js-map-svg-auto-fit-into-parent-container-and-resize-with-window
// draw = (ht) => {
//   $('body').html("<svg id='map' width='100%' height='" + ht + "'></svg>");
//   map = d3.select("svg");
//   let width = $("svg").parent().width();
//   let height = ht;

//   projection = d3.geoNaturalEarth1().scale((150)*100).translate([width/2, height/2]);
//   // const path = d3.geoPath().projection(projection);
//   render()
// }

// draw($("body").width()/2);

// $(window).resize(function() {
//   if(this.resizeTO) clearTimeout(this.resizeTO);
//   this.resizeTO = setTimeout(function() {
//       $(this).trigger('resizeEnd');
//   }, 500);
// });

// $(window).bind('resizeEnd', function() {
//   // var height = $("body").width()/2;
//   $("body svg").css("height", height);
//   render();
// });