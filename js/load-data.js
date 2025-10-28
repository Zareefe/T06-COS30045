// js/main.js
d3.csv("data/Ex6_TVdata.csv").then(data => {
  data.forEach(d => {
    d.energyConsumption = +d.energyConsumption;
  });

  console.log("Data loaded:", data.length, "rows");
  drawHistogram(data);
  populateFilters(data);
});
