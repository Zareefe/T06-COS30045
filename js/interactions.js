// js/interactions.js
function populateFilters(data) {
  const filterContainer = d3.select("#filters");

  const buttons = filterContainer.selectAll("button")
    .data(filters_screen)
    .join("button")
    .attr("class", d => `filter-btn ${d.isActive ? "active" : ""}`)
    .text(d => d.label)
    .on("click", (event, d) => {
      filters_screen.forEach(f => f.isActive = false);
      d.isActive = true;
      buttons.classed("active", f => f.isActive);

      updateHistogram(d.id, data);
    });
}

function updateHistogram(filterId, data) {
  let filteredData = data;

  if (filterId !== "all") {
    filteredData = data.filter(d => d.screenTech === filterId);
  }

  const updatedBins = binGenerator(filteredData);

  const svg = d3.select("#chart svg g");

  // Update scales
  yScale.domain([0, d3.max(updatedBins, d => d.length)]);

  // Update bars with transition
  const bars = svg.selectAll("rect")
    .data(updatedBins);

  bars.join(
    enter => enter.append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.x0))
      .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
      .attr("y", height)
      .attr("height", 0)
      .transition()
      .duration(700)
      .attr("y", d => yScale(d.length))
      .attr("height", d => height - yScale(d.length)),

    update => update.transition()
      .duration(700)
      .attr("y", d => yScale(d.length))
      .attr("height", d => height - yScale(d.length))
  );
}
