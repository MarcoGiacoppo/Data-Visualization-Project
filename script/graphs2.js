function init() {
    var w = 800;
    var h = 600;
    var padding = 50;
  
    d3.csv("csv/ausDepartures.csv").then(function(data) {
      data.forEach(function(d) {
        d.Year = +d.Year;
        d.Value = +d.Value;
      });
  
      drawBarChart(data);
    });
  
    function drawBarChart(dataset) {
      var states = dataset.map(function(d) {
        return d.Category;
      });
  
      var years = dataset.map(function(d) {
        return d.Year;
      });
  
      var values = dataset.map(function(d) {
        return d.Value;
      });
  
      var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
      var xScale = d3.scaleBand()
        .domain(years)
        .range([padding, w - padding])
        .padding(0.1);
  
      var yScale = d3.scaleLinear()
        .domain([0, d3.max(values)])
        .range([h - padding, padding]);
  
      var svg = d3.select(".barChart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

        var yAxis = d3.axisLeft()
  .ticks(19) // Specify the desired number of ticks (e.g., 10)
  .scale(yScale);
  
      svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d) {
          return xScale(d.Year);
        })
        .attr("y", function(d) {
          return yScale(d.Value);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
          return h - padding - yScale(d.Value);
        })
        .attr("fill", function(d, i) {
          return colorScale(i);
        });
  
      svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
          return d.Value;
        })
        .attr("x", function(d) {
          return xScale(d.Year) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
          return yScale(d.Value) - 5;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black");
  
      svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(d3.axisBottom(xScale));
  
      svg.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);
    }
  }
  
  window.onload = init;
  