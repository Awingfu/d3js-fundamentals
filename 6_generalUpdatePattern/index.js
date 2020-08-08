const svg = d3.select("svg");

const height = +svg.attr("height");
const width = +svg.attr("width");

const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c11d1d", "#eae600"]);

const radiusScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([80, 50]);

const xPos = (d, i) => i * 180 + 120

const fruitBowl = (selection, props) => {
  const { fruits, height } = props;
  // Enter ensures data matches up with circles
  const circles = selection.selectAll("circle").data(fruits, (d) => d.id);

  circles
    .enter().append("circle") // append necessary circles
      .attr("cx", xPos) //set initial x location
      .attr("cy", height / 2)
      .attr("r", 0)
    .merge(circles) // merge attaches update call
      .attr("fill", (d) => colorScale(d.type))
    .transition().duration(500)
      .attr("cx", xPos) // update x positions on update
      .attr("r", (d) => radiusScale(d.type));

  // circles // automatically covers update case w/o a selection
  //   .attr("fill", (d) => colorScale(d.type))
  //   .attr("r", (d) => radiusScale(d.type));

  circles
    .exit()
    .transition().duration(500)
      .attr("r", 0)
    .remove(); // remove elements with no corresponding data

  const text = selection.selectAll("text").data(fruits, (d) => d.id);

  text
    .enter().append("text") // append necessary circles
      .attr("x", xPos) //set initial x location
      .attr("y", height / 2 + 120)
    .merge(text) // merge attaches update call
      .text((d) => d.type)
    .transition().duration(500)
      .attr("x", xPos) //set initial x location
  text.exit().remove(); // remove elements with no corresponding data
};

const render = () => {
  fruitBowl(svg, {
    fruits,
    height,
  });
};

const makeFruit = (type) => ({ type, id: Math.random() }); // Return new object

let fruits = d3.range(5).map(() => makeFruit("apple")); // make array of 5 apple objects

render();

// eat an apple
setTimeout(() => {
  fruits.pop();
  render();
}, 1000);

// replace apple with lemon
setTimeout(() => {
  fruits[2].type = "lemon";
  render();
}, 2000);

// eat an apple
setTimeout(() => {
  fruits = fruits.filter((d, i) => i != 1);
  render();
}, 3000);
