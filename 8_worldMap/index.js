const svg = d3.select("svg");

const height = +svg.attr("height");
const width = +svg.attr("width");

d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  .then(data => {
    console.log(data);
  })