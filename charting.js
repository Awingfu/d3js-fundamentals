// // Bar chart
// let w = 400;
// let h = 200;
// let padding = 2;
// let dataset = [5, 10, 15, 20, 25, 11, 25, 22, 18, 7];
// let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// colorPicker = (v) => v > 20 ? "#FF0033" : "#666666"

// svg.selectAll("rect")
//   .data(dataset)
//   .enter()
//   .append("rect")
//   // .attr({
//   //   x: (d,i) => i * (w / dataset.length),
//   //   y: (d) => h - (4 * d)
//   // })
//   .attr("x", (d,i) => i*(w / dataset.length))
//   .attr("y", (d) => h-(4*d))
//   .attr("width", w/dataset.length - padding)
//   .attr("height", (d) => 4* d)
//   .attr("fill", (d) => colorPicker(d))
//   .attr("class", "bar")

// svg.selectAll("text")
//   .data(dataset)
//   .enter()
//   .append("text")
//   .text((d) => d)
//   // .attr({
//   //   "text-anchor": "middle",
//   //   x: function(d,i) {return i + (w / dataset.length);},
//   //   y: function(d) {return h-(4*d);},
//   // });
//   .attr("text-anchor", "middle")
//   .attr("x", (d,i) => i*(w / dataset.length) + (w / dataset.length - padding)/2)
//   .attr("y", (d) => h-(4*d)+14)
//   .attr("font-family","sans-serif")
//   .attr("font-size",12)
//   .attr("fill","#ffffff")


// Scatter

const dataset = [
  [ 34,     78 ],
  [ 109,   280 ],
  [ 310,   120 ],
  [ 79,   411 ],
  [ 420,   220 ],
  [ 233,   145 ],
  [ 333,   96 ],
  [ 222,    333 ],
  [ 78,    320 ],
  [ 21,   123 ]
];

const w = 500;
const h = 500;
const padding = 60;

const xScale = d3.scaleLinear()
     .domain([0, d3.max(dataset, (d) => d[0])])
     .range([padding, w - padding]);

const yScale = d3.scaleLinear()
     .domain([0, d3.max(dataset, (d) => d[1])])
     .range([h - padding, padding]);

const svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

svg.selectAll("circle")
.data(dataset)
.enter()
.append("circle")
.attr("cx", (d) => xScale(d[0]))
.attr("cy", (d) => yScale(d[1]))
.attr("r", 5);

svg.selectAll("text")
.data(dataset)
.enter()
.append("text")
.text((d) =>  (d[0] + ", "
+ d[1]))
.attr("x", (d) => xScale(d[0] + 10))
.attr("y", (d) => yScale(d[1]));

const xAxis = d3.axisBottom(xScale);
// Add your code below this line
const yAxis = d3.axisLeft(yScale);
// Add your code above this line

svg.append("g")
   .attr("transform", "translate(0," + (h - padding) + ")")
   .call(xAxis);

// Add your code below this line
svg.append("g")
   .attr("transform", "translate(" + padding + ",0)")
   .call(yAxis)
