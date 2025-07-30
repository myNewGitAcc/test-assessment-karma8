/**
 * This function mocks data we should normally fetch by an api request.
 * I didn't make static json file as I did for news, because it would be quite large.
 * @param year {number}
 * @param month {number}
 */
export function generateDailyUsageForMonth(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-based
  const data = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const value = Math.floor(Math.random() * 1001); // 0 to 1000. 1001 because of Math.floor rounding
    const monthName = new Date(year, month - 1).toLocaleString('en-US', {
      month: 'short'
    });
    const dateStr = `${day} ${monthName}`;

    data.push({ date: dateStr, value });
  }

  return data;
}
