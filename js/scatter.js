// js/scatter.js
function drawScatterplot(data) {
  console.log("✅ Drawing scatterplot with", data.length, "rows");

  // Parse numeric fields
  data.forEach(d => {
    d.star = +d.star;
    d.energyConsumption = +d.energyConsumption;
  });

  // Create SVG container
  const svgContainer = d3.select("#scatter-plot");
  if (svgContainer.empty()) {
    console.error("❌ Missing <div id='scatterplot'> in HTML.");
    return;
  }

  const svg = svgContainer.append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .style("width", "100%")
    .style("height", "auto");

  // Inner chart group
  innerChartS = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Scales
  const xExtent = d3.extent(data, d => d.star);
  const yExtent = [0, d3.max(data, d => d.energyConsumption)];

  xScaleS.domain([xExtent[0] - 0.2, xExtent[1] + 0.2]);
  yScaleS.domain([0, yExtent[1] * 1.05]);

  // Circles
  innerChartS.selectAll("circle.point")
    .data(data)
    .join("circle")
    .attr("class", "point")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.65)
    .style("cursor", "pointer");

  // Axes
  innerChartS.append("g")
    .attr("transform", `translate(0,${height})`)
    .attr("class", "axis axis--x")
    .call(d3.axisBottom(xScaleS).ticks(6));

  innerChartS.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(yScaleS));

  // Axis labels
  innerChartS.append("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .attr("text-anchor", "middle")
    .text("Star Rating");

  innerChartS.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 12)
    .attr("text-anchor", "middle")
    .text("Energy Consumption (kWh/year)");

  // Legend
  const techs = Array.from(new Set(data.map(d => d.screenTech)));
  const legend = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top - 5})`);

  legend.selectAll("g")
    .data(techs)
    .join("g")
    .attr("transform", (d, i) => `translate(${i * 120}, 0)`)
    .each(function (d) {
      const g = d3.select(this);
      g.append("rect")
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", colorScale(d))
        .attr("rx", 3);
      g.append("text")
        .attr("x", 20)
        .attr("y", 11)
        .text(d)
        .style("font-size", "12px")
        .attr("fill", "#222");
    });
}
