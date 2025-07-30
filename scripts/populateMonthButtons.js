'use strict';
import { generateDailyUsageForMonth } from '../utils/generateChartData.js';
import { chart } from './drawChart.js';

const monthListContainer = document.getElementById('monthList');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

const monthList = [
  'Jan, 24',
  'Feb, 24',
  'Mar, 24',
  'Apr, 24',
  'May, 24',
  'June, 24',
  'July, 24',
  'Aug, 24',
  'Sep, 24',
  'Oct, 24',
  'Nov, 24',
  'Dec, 24'
];

let selectedMonthIndex = 0;

function generateMonthButtons() {
  monthListContainer.innerHTML = '';

  monthList.forEach((label, index) => {
    const btn = document.createElement('button');
    btn.className = 'month-btn';
    btn.textContent = label;
    if (index === selectedMonthIndex) btn.classList.add('active');

    btn.addEventListener('click', () => {
      selectedMonthIndex = index;
      updateChartForMonth(index);
      updateActiveMonth();
    });

    monthListContainer.appendChild(btn);
  });
}

function updateActiveMonth() {
  const buttons = monthListContainer.querySelectorAll('.month-btn');
  buttons.forEach((btn, i) => {
    btn.classList.toggle('active', i === selectedMonthIndex);
  });
}

function updateChartForMonth(index) {
  const [monthStr, yearStr] = monthList[index].split(' ');
  const month = new Date(`${monthStr} 1, ${yearStr}`).getMonth() + 1;
  const year = parseInt(yearStr);

  const data1 = generateDailyUsageForMonth(year, month);
  const data2 = generateDailyUsageForMonth(year, month);

  chart.data.labels = data1.map((d) => d.date);
  chart.data.datasets[0].data = data1.map((d) => d.value);
  chart.data.datasets[1].data = data2.map((d) => d.value);
  chart.update();
}

scrollLeftBtn.addEventListener('click', () => {
  monthListContainer.scrollBy({ left: -150, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
  monthListContainer.scrollBy({ left: 150, behavior: 'smooth' });
});

generateMonthButtons();
updateChartForMonth(selectedMonthIndex);
