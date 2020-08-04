// import {select, arc} from 'd3';

const svg = d3.select('svg');

const height = +svg.attr('height'); //+ === parseFloat
const width = +svg.attr('width');

const g = svg
  .append('g') // group element
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

const circle = g
  .append('circle')
    .attr('r', height / 2)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');

const mouth = g
  .append('path')
    .attr('d', d3.arc()({
      innerRadius: 100,
      outerRadius: 120,
      startAngle: Math.PI / 2,
      endAngle: Math.PI * 3 / 2
    }));

const eyeSpacing = 100;
const eyeRadius = 30;
const eyeYOffset = -70;
const eyeBrowWidth = 70;
const eyeBrowHeight = 15;
const eyebrowYOffset = -70;

const eyesGroup = g
  .append('g')
    .attr('transform', `translate(0, ${eyeYOffset})`);

const leftEye = eyesGroup
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', -eyeSpacing);

const rightEye = eyesGroup
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', eyeSpacing);

const eyeBrowsGroup = eyesGroup
  .append('g')
    .attr('transform', `translate(0, ${eyebrowYOffset})`)

// need to separately apply transitions otherwise you cannot append more features
eyeBrowsGroup
  .transition().duration(200)
    .attr('transform', `translate(0, ${eyebrowYOffset - 30})`)
  .transition().duration(200)
    .attr('transform', `translate(0, ${eyebrowYOffset})`)  .transition().duration(200)
    .attr('transform', `translate(0, ${eyebrowYOffset - 30})`)
  .transition().duration(200)
    .attr('transform', `translate(0, ${eyebrowYOffset})`)

const leftEyeBrow = eyeBrowsGroup
  .append('rect')
    .attr('x', -eyeSpacing - eyeBrowWidth / 2)
    .attr('width', eyeBrowWidth)
    .attr('height', eyeBrowHeight)

const rightEyeBrow = eyeBrowsGroup
  .append('rect')
    .attr('x', eyeSpacing - eyeBrowWidth / 2)
    .attr('width', eyeBrowWidth)
    .attr('height', eyeBrowHeight)

