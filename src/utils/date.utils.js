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
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const offset = date.getTimezoneOffset() / 60;
    const hour = date.getUTCHours() - offset;
    const rawMinutes = date.getMinutes();
    const minutes = `${rawMinutes}`.length < 2 ? `0${rawMinutes}` : rawMinutes;
    const dayTime = hour >= 13 ? 'PM' : 'AM';
    const formattedDate = `${month}/${day}/${year}`;
    const time = `${dayTime === 'PM' ? hour - 12 : hour}:${minutes} ${dayTime}`;
    return [formattedDate, time];
  },
};
