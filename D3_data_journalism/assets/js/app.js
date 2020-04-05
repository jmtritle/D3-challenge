// @TODO: YOUR CODE HERE!

d3.csv("../assets/data/data.csv", function(data) {
    console.log(data);
    console.log(data.poverty);
    console.log(data.smokes);
    console.log(data.abbr)
});

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;