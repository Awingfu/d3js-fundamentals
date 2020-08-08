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

const fruitBowl = (selection, props) => {
  const { fruits, height } = props;

  const bowl = selection.selectAll('rect').data([null]).enter()
    .append('rect')
    .attr('y', 110)
    .attr('width', 950)
    .attr('height', 300)
    .attr('rx', 300/2);    

  const groups = selection.selectAll('g')
    .data(fruits, (d) => d.id);
  
  const groupsEnter = groups.enter().append('g')
    .attr("r", 0)
    .attr('transform', (d,i) => 
        `translate(${i * 180 + 120},${height/2})`
      )

  groupsEnter
    .merge(groups)
    .transition().duration(500)
      .attr('transform', (d,i) => 
        `translate(${i * 180 + 120},${height/2})`
      )

  groups.exit().remove();
      
  groupsEnter.append('circle')
    .merge(groups.select('circle'))
      .attr('fill', d => colorScale(d.type))  
    .transition().duration(500)
      .attr("r", (d) => radiusScale(d.type));

  groupsEnter.append('text')
    .merge(groups.select('text'))
      .text(d => d.type)
      .attr('y', 120)
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
