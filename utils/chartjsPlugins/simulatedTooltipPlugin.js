'use strict';

export const simulatedTooltipPlugin = {
  id: 'simulatedTooltip',
  afterDatasetsDraw(chart) {
    const { ctx, tooltip } = chart;

    if (!tooltip || !tooltip._active || !tooltip._active.length) return;

    // Draw tooltips for each dataset
    const paddingX = 8;
    const paddingY = 8;
    const lineHeight = 14;
    const spacing = 6;

    tooltip.dataPoints.forEach((point, index, points) => {
      const { x, y } = point.element;
      const label = point.label;
      const value = point.formattedValue;
      const color = point.dataset.borderColor;

      const lines = [label, `${value} GB`];

      // Calculate box size
      const textWidth = Math.max(
        ...lines.map((line) => ctx.measureText(line).width)
      );
      const boxWidth = textWidth + paddingX * 2;
      const boxHeight = lines.length * lineHeight + paddingY * 2;

      // Vertical spacing to prevent overlap
      const offset = (index - (points.length - 1) / 2) * (boxHeight + spacing);
      const boxX = x - boxWidth / 2;
      const boxY = y - boxHeight - 10 + offset;

      drawTooltipBox(ctx, boxX, boxY, boxWidth, boxHeight, color);
      drawTooltipText(ctx, lines, x, boxY, paddingY, lineHeight);
    });
  }
};

function drawTooltipBox(ctx, x, y, width, height, borderColor) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 6);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = borderColor;
  ctx.stroke();
  ctx.restore();
}

function drawTooltipText(ctx, lines, centerX, boxY, paddingY, lineHeight) {
  ctx.save();
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  lines.forEach((line, i) => {
    const textY = boxY + paddingY + i * lineHeight;
    ctx.fillText(line, centerX, textY);
  });

  ctx.restore();
}
