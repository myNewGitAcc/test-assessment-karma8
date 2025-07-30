'use strict';
import { generateDailyUsageForMonth } from '../utils/generateChartData.js';
import { verticalLinePlugin } from '../utils/chartjsPlugins/verticalLinePlugin.js';
import { simulatedTooltipPlugin } from '../utils/chartjsPlugins/simulatedTooltipPlugin.js';
import { showOnlyActiveDotsPlugin } from '../utils/chartjsPlugins/showOnlyActiveDotsPlugin.js';
import { topYAxisLabelPlugin } from '../utils/chartjsPlugins/topYAxisLabelPlugin.js';

const dataSet1 = generateDailyUsageForMonth(2024, 8);
const dataSet2 = generateDailyUsageForMonth(2024, 8);

// const maxY = 1000;
// const normalizedValues = rawValues.map(v => v / maxY);

const labels = dataSet1.map((d) => d.date);
const values1 = dataSet1.map((d) => d.value);
const values2 = dataSet2.map((d) => d.value);

const ctx = document.getElementById('dailyUsageChart').getContext('2d');

Chart.register(verticalLinePlugin);
Chart.register(simulatedTooltipPlugin);
Chart.register(showOnlyActiveDotsPlugin);
Chart.register(topYAxisLabelPlugin);

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      {
        data: values1,
        borderColor: 'blue',
        tension: 0.1
      },
      {
        data: values2,
        borderColor: 'red',
        tension: 0.1
      }
    ]
  },
  options: {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
        external: () => {} // taken from custom plugin in options.plugins
      }
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
          tickColor: 'transparent'
        }
      },
      y: {
        title: {
          display: false
        },
        grid: {
          drawOnChartArea: false,
          tickColor: 'transparent'
        },
        ticks: {
          padding: 10,
          callback: function (label, index, labels) {
            const divided = parseInt(label) / 1000;
            return divided.toFixed(1);
          }
        }
      }
    }
  },
  plugins: [
    verticalLinePlugin,
    simulatedTooltipPlugin,
    showOnlyActiveDotsPlugin,
    topYAxisLabelPlugin
  ]
});

export { chart };
