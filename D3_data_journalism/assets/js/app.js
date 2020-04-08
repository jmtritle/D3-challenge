var svgHeight = 500;
var svgWidth = 900;

var margin = {
    top: 30, 
    right: 30, 
    bottom: 40, 
    left: 60
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

chartGroup.append("text")             
.attr("transform",
      "translate(" + (chartWidth/2) + " ," + 
                     (chartHeight + margin.top) + ")")
.style("text-anchor", "middle")
.text("Poverty Rate (%)");

chartGroup.append("g")
  .call(yAxis);

  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (chartHeight / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Smoking Rate (%)"); 

var circles = chartGroup.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", d => xScale(d.poverty))
.attr("cy", d => yScale(d.smokes))
.attr("r", 15)
.attr("opacity", ".6")
.attr("class", "stateCircle");

var circleText = chartGroup.selectAll("text")
.data(data)
.enter()
.append("text")
.attr("x", d => xScale(d.poverty))
.attr("y", d => yScale(d.smokes))
.classed("text-circles", true)
.attr("dy", 5)
.attr("font-size", "9px")
.attr("text-anchor", "middle")
.text (d => d.abbr);

  });

 