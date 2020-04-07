var svgHeight = 900;
var svgWidth = 900;

var margin = {
    top: 20, 
    right: 20, 
    bottom: 30, 
    left: 40
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("../assets/data/data.csv").then(function(data) {

    data.forEach(function(item) {
        item.poverty = +item.poverty;
        item.smokes = +item.smokes;
      });
  


  var xScale = d3.scaleLinear()
    .domain([0,d3.max(data,function (d) { return d.poverty })])
    .range([0,chartWidth]);
  var yScale = d3.scaleLinear()
    .domain([0,d3.max(data,function (d) { return d.smokes })])
    .range([chartHeight,0]);

var xAxis = d3.axisBottom()
  .scale(xScale);

var yAxis = d3.axisLeft()
  .scale(yScale);

  chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

chartGroup.append("g")
  .call(yAxis);

var circles = chartGroup.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", d => xScale(d.poverty))
.attr("cy", d => yScale(d.smokes))
.attr("r", "20")
.attr("class", "stateCircle")

var circleText = chartGroup.selectAll("text")
.data(data)
.enter()
.append("text")
.attr("x", d => xScale(d.poverty))
.attr("y", d => yScale(d.smokes))
.text (d => d.abbr)
.attr("class", "stateText")


  });

 