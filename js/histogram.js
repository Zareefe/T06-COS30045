// js/histogram.js
function drawHistogram(data) {
  // Create SVG
  const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Generate bins
  const bins = binGenerator(data);

  // Define scales
  xScale.domain([0, d3.max(bins, d => d.x1)]);
  yScale.domain([0, d3.max(bins, d => d.length)]);

  // Bars
  svg.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
    .attr("height", d => height - yScale(d.length));

  // X Axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Y Axis
  svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale));

  // X Label
  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .attr("text-anchor", "middle")
    .text("Energy Consumption (kWh/year)");

  // Y Label
  svg.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 15)
    .attr("text-anchor", "middle")
    .text("Frequency");
}
