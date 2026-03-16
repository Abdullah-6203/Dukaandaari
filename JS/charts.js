// ===== charts.js =====
// Shared Chart.js utility functions used across pages

const ChartDefaults = {
  gridColor: "#f1f5f9",
  tickColor: "#94a3b8",
  tickFont: { size: 12 },
  cyan: "#06b6d4",
  emerald: "#34d399",
  blue: "#60a5fa",
  purple: "#a78bfa",
  orange: "#fb923c",
};

// Format number as INR
function formatINR(val) {
  if (val >= 100000) return "₹" + (val / 100000).toFixed(1) + "L";
  if (val >= 1000) return "₹" + (val / 1000).toFixed(0) + "k";
  return "₹" + val;
}

// Build weekly sales bar chart (used on Overview)
function buildWeeklySalesChart(canvasId) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          label: "Sales (₹)",
          data: [6200, 5800, 7100, 6500, 8200, 9400, 8420],
          backgroundColor: "rgba(6,182,212,0.85)",
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: (ctx) => "₹" + ctx.raw.toLocaleString("en-IN") },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: ChartDefaults.tickColor, font: ChartDefaults.tickFont },
        },
        y: {
          grid: { color: ChartDefaults.gridColor },
          ticks: {
            color: ChartDefaults.tickColor,
            font: ChartDefaults.tickFont,
            callback: (v) => formatINR(v),
          },
        },
      },
    },
  });
}

// Build category donut chart (used on Overview)
function buildCategoryDonut(canvasId) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Dairy & Eggs", "Snacks", "Staples", "Beverages", "Personal Care"],
      datasets: [
        {
          data: [32, 24, 20, 14, 10],
          backgroundColor: [
            ChartDefaults.cyan,
            ChartDefaults.emerald,
            ChartDefaults.blue,
            ChartDefaults.purple,
            ChartDefaults.orange,
          ],
          borderWidth: 0,
          hoverOffset: 5,
        },
      ],
    },
    options: {
      responsive: false,
      cutout: "72%",
      plugins: { legend: { display: false } },
    },
  });
}

// Build revenue line chart (used on Sales page)
function buildLineChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "This Period",
          data: data.current,
          borderColor: ChartDefaults.cyan,
          backgroundColor: "rgba(6,182,212,0.08)",
          borderWidth: 2.5,
          pointBackgroundColor: ChartDefaults.cyan,
          pointRadius: 4,
          tension: 0.4,
          fill: true,
        },
        {
          label: "Last Period",
          data: data.previous,
          borderColor: "#e2e8f0",
          borderWidth: 2,
          pointBackgroundColor: "#e2e8f0",
          pointRadius: 3,
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: ChartDefaults.tickColor, font: ChartDefaults.tickFont },
        },
        y: {
          grid: { color: ChartDefaults.gridColor },
          ticks: {
            color: ChartDefaults.tickColor,
            font: ChartDefaults.tickFont,
            callback: (v) => formatINR(v),
          },
        },
      },
    },
  });
}

// Build hourly peak chart (used on Sales page)
function buildHourlyChart(canvasId) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"],
      datasets: [
        {
          data: [820, 1240, 1980, 1100, 1450, 2200, 1760],
          backgroundColor: (ctx) =>
            ctx.raw >= 2000 ? ChartDefaults.cyan : "rgba(6,182,212,0.3)",
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: ChartDefaults.tickColor, font: { size: 11 } },
        },
        y: {
          grid: { color: ChartDefaults.gridColor },
          ticks: {
            color: ChartDefaults.tickColor,
            font: { size: 11 },
            callback: (v) => "₹" + v,
          },
        },
      },
    },
  });
}

// Build category bar chart (used on Sales page)
function buildCategoryBarChart(canvasId) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Dairy & Eggs", "Snacks", "Staples", "Beverages", "Personal Care"],
      datasets: [
        {
          data: [16500, 12400, 10300, 7200, 5220],
          backgroundColor: [
            ChartDefaults.cyan,
            ChartDefaults.emerald,
            ChartDefaults.blue,
            ChartDefaults.purple,
            ChartDefaults.orange,
          ],
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: ChartDefaults.tickColor, font: ChartDefaults.tickFont },
        },
        y: {
          grid: { color: ChartDefaults.gridColor },
          ticks: {
            color: ChartDefaults.tickColor,
            font: ChartDefaults.tickFont,
            callback: (v) => formatINR(v),
          },
        },
      },
    },
  });
}
