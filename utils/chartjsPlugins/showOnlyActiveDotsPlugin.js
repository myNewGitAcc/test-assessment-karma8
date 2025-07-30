'use strict';

export const showOnlyActiveDotsPlugin = {
  id: 'showOnlyActiveDots',
  beforeDatasetsDraw(chart) {
    const activeElements = chart.tooltip._active || [];

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      dataset.pointRadius = (ctx) => {
        const index = ctx.dataIndex;

        // If there's a matching active element for this dataset and index, show dot
        const match = activeElements.find(
          (el) => el.datasetIndex === datasetIndex && el.index === index
        );
        return match ? 4 : 0; // Show point radius 4 only on hovered points
      };
    });
  }
};
