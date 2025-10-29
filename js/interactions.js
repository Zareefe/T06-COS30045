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

// js/interactions.js (append)

// createTooltipScatter: create tooltip group in innerChartS (scatter inner chart)
function createTooltipScatter() {
  if (!innerChartS) {
    console.warn("innerChartS not yet created - tooltip delayed.");
    return;
  }

  // create group for tooltip (initially hidden)
  const tt = innerChartS.append("g")
    .attr("class", "scatter-tooltip")
    .style("opacity", 0);

  // rectangle background
  tt.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("fill", "#ffffff")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1)
    .style("filter", "drop-shadow(0px 1px 4px rgba(0,0,0,0.15))");

  // text lines: two lines (title + value)
  tt.append("text")
    .attr("class", "tt-line1")
    .attr("x", tooltipPadding)
    .attr("y", tooltipPadding + 10)
    .style("font-size", "12px")
    .style("font-weight", "600");

  tt.append("text")
    .attr("class", "tt-line2")
    .attr("x", tooltipPadding)
    .attr("y", tooltipPadding + 28)
    .style("font-size", "11px")
    .style("fill", "#333");
}

// handleMouseEventsScatter: attach event listeners to scatter points
function handleMouseEventsScatter() {
  if (!innerChartS) {
    console.warn("innerChartS not yet created - mouse handlers delayed.");
    return;
  }

  const tt = innerChartS.select("g.scatter-tooltip");

  // select points and add events
  innerChartS.selectAll("circle.point")
    .on("mouseenter", function(event, d) {
      // populate content
      const tech = d.screen_tech || d.screenTech || "Unknown";
      const brand = d.brand || "";
      const model = d.model || "";
      const energy = d.energy_consumpt != null ? d.energy_consumpt.toFixed(1) : "N/A";
      const star = d.star2 != null ? d.star2 : "";

    tt.select(".tt-line1").text(`${d.brand} ${d.model}`);
    tt.select(".tt-line2").text(`Energy: ${d.energyConsumption} kWh/year • Star: ${d.star}`);

      // position tooltip near the circle
      const cx = +this.getAttribute("cx");
      const cy = +this.getAttribute("cy");

      // prefer to put tooltip to the right unless near right edge
      const tx = cx + 12;
      const ty = Math.max(0, cy - tooltipHeight / 2);

      tt.transition().duration(120).style("opacity", 1)
        .attr("transform", `translate(${tx},${ty})`);
    })
    .on("mouseleave", function() {
      tt.transition().duration(250).style("opacity", 0)
        .attr("transform", `translate(-9999,-9999)`); // move away
    });
}
