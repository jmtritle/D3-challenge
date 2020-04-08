// setting up the chart height, width, and margins
var svgHeight = 500;
var svgWidth = 960;

var margin = {
    top: 20, 
    right: 40, 
    bottom: 60, 
    left: 100
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// selecting the 'scatter' on the index page and appending the svg
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// setting up the chart group and running a transform on it
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// pulling the data from the .csv
d3.csv("./assets/data/data.csv").then(function(data) {

  // turning the data into useful integers! for this one: poverty and smoking
    data.forEach(function(item) {
        item.poverty = +item.poverty;
        item.smokes = +item.smokes;
      });
  
// setting up the scales for both the x and y axis, using poverty and smoking as the options
  var xScale = d3.scaleLinear()
    .domain([0,d3.max(data,function (d) { return d.poverty })])
    .range([0,chartWidth]);
  var yScale = d3.scaleLinear()
    .domain([0,d3.max(data,function (d) { return d.smokes })])
    .range([chartHeight,0]);

// setting up the x axis accordingly
var xAxis = d3.axisBottom()
  .scale(xScale);

// setting up the y axis as appropriate
var yAxis = d3.axisLeft()
  .scale(yScale);

// adding the x axis
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

// adding the x axis label with some shenanigans
chartGroup.append("text")             
.attr("transform",
      "translate(" + (chartWidth/2) + " ," + 
                     (chartHeight + margin.top) + ")")
.style("text-anchor", "middle")
.text("Poverty Rate (%)");

// adding the y xis
chartGroup.append("g")
  .call(yAxis);

// adding the y axis label with additional shenanigans

chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (chartHeight / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Smoking Rate (%)"); 

// circling the wagons! 
var circles = chartGroup.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", d => xScale(d.poverty))
.attr("cy", d => yScale(d.smokes))
.attr("r", 15)
.attr("opacity", ".6")
.attr("class", "stateCircle");

// adding text to the wagons- er, circles. 
// not sure why not all circles have text, but it is what it is

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

 