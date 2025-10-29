// js/shared-constants.js
const margin = { top: 10, right: 20, bottom: 40, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const colors = {
  background: "#fafafa",
  barColor: "steelblue",
  axisColor: "#333"
};

// Bin generator
const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, 600])
  .thresholds(20); // number of bins

// Scales (declared globally so they can be reused)
const xScale = d3.scaleLinear().range([0, width]);
const yScale = d3.scaleLinear().range([height, 0]);

// Filter setup
const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "LED", label: "LED", isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

// --- scatter-specific shared constants (append to shared-constants.js) ---

// scatter inner chart (will be created in scatterplot.js but referenced elsewhere)
let innerChartS = null;

// scatter scales (separate to avoid interfering with histogram scales)
const xScaleS = d3.scaleLinear().range([0, width]);     // domain set in drawScatterplot
const yScaleS = d3.scaleLinear().range([height, 0]);    // domain set in drawScatterplot

// tooltip sizing
const tooltipWidth = 140;
const tooltipHeight = 48;
const tooltipPadding = 8;

// color scale for screenTech (categories)
const colorScale = d3.scaleOrdinal()
  .domain(["LCD", "LED", "OLED"]) // keep categories you expect; additional categories will auto-get colors
  .range(["#2ca02c", "#1f77b4", "#d62728"]); // green / blue / red (adjust to your green theme if desired)
