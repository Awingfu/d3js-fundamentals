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
  const { fruits, height, onClick, selectedFruit } = props;
  const circles = selection.selectAll("circle").data(fruits, (d) => d.id);

  circles
    .enter().append("circle") 
      .attr("cx", xPos) 
      .attr("cy", height / 2)
      .attr("r", 0)
    .merge(circles) 
      .attr("fill", (d) => colorScale(d.type))
      .attr('stroke-width', 5)
      .attr('stroke', d => d.id === selectedFruit? 'black' : 'none')
      // .on('click', (d) => {onClick(d.id)})
      .on('mouseover', (d) => {onClick(d.id)}) //hover
      .on('mouseout', (d) => {onClick(null)}) //un hover
    .transition().duration(500)
      .attr("cx", xPos) 
      .attr("r", (d) => radiusScale(d.type));

  circles
    .exit()
    .transition().duration(500)
      .attr("r", 0)
    .remove();
};


const makeFruit = (type) => ({ type, id: Math.random() }); // Return new object

let fruits = d3.range(5).map(() => makeFruit("apple")); // make array of 5 apple objects
let selectedFruit = null;

const onClick = id => {
  selectedFruit = id;
  render();
}

const render = () => {
  fruitBowl(svg, {
    fruits,
    height,
    onClick,
    selectedFruit
  });
};
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
