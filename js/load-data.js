// js/main.js
d3.csv("data/Ex6_TVdata.csv").then(data => {
  data.forEach(d => {
    d.energyConsumption = +d.energyConsumption;
        d.energy_consumpt = +d.energy_consumpt;     // for scatter (Ex5 CSV sample)
    d.star2 = +d.star2;
    d.screensize = +d.screensize;
  });

  console.log("Data loaded:", data.length, "rows");
  drawHistogram(data);
  populateFilters(data);
    // draw scatterplot (new) — make sure scatterplot.js is loaded
  drawScatterplot(data);

  // create tooltip group and attach mouse handlers AFTER scatter is drawn
  createTooltipScatter();
  handleMouseEventsScatter();
});
