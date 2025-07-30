'use strict';

export const topYAxisLabelPlugin = {
  id: 'topYAxisLabel',
  afterDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    const yScale = scales.y;

    ctx.save();
    const label = 'TB';
    const x = chartArea.left - 36;
    const y = yScale.top - 8;

    ctx.fillText(label, x, y);
    ctx.restore();
  }
};
