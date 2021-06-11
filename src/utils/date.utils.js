/**
 * collected date utils
 */

'use strict';

module.exports = {
  subtractDaysFromToday: (days = 1) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.setDate(today.getDate() - days);
  },
  friendlyTimeAndDate: (date = Date.now()) => {
    const dateTimeStr = date.toLocaleString('en-US', {
      timeZone: 'America/New_York',
    });
    const [dateStr, timeStr] = dateTimeStr.split(', ');
    const [rawHour, minutes, remainder] = timeStr.split(':');
    const hour = rawHour < 10 ? `0${rawHour}` : rawHour;
    const label = remainder.split(' ')[1];
    const time = `${hour}:${minutes} ${label}`;
    return [dateStr, time];
  },
};
