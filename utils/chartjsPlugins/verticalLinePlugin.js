'use strict';

export const verticalLinePlugin = {
  id: 'verticalLinePlugin',
  beforeDraw: (chart) => {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const ctx = chart.ctx;
      const x = chart.tooltip._active[0].element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'lightgray';
      ctx.stroke();
      ctx.restore();
    }
  }
};
