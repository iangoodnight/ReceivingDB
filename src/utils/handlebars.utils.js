/**
 *
 * /utils/
 *
 * handlebars.utils.js
 *
 **/

'use strict';

const { subtractDaysFromToday, friendlyTimeAndDate } = require('./date.utils');

module.exports = {
  math: function (lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return {
      '+': lvalue + rvalue,
      '-': lvalue - rvalue,
      '*': lvalue * rvalue,
      '/': lvalue / rvalue,
      '%': lvalue % rvalue,
    }[operator];
  },
  dateRange: function (start, end) {
    const startDate = new Date(subtractDaysFromToday(parseInt(start)));
    const endDate = new Date(subtractDaysFromToday(parseInt(end)));
    const sMonth = startDate.getMonth() + 1;
    const sDay = startDate.getDate();
    const sYear = startDate.getFullYear();
    const eMonth = endDate.getMonth() + 1;
    const eDay = endDate.getDate();
    const eYear = endDate.getFullYear();
    return `${sMonth}/${sDay}/${sYear} - ${eMonth}/${eDay}/${eYear}`;
  },
  friendlyDateTime: function (date) {
    const [friendlyDate, friendlyTime] = friendlyTimeAndDate(new Date(date));
    return `${friendlyDate} @ ${friendlyTime}`;
  },
  friendlyDate: function (date) {
    const newDate = new Date(date);
    const offset = newDate.getTimezoneOffset();
    const friendlyDate = new Date(newDate.getTime() - offset * 60 * 1_000);
    return friendlyDate.toISOString().split('T')[0];
  },
  friendlyTime: function (date) {
    const thisDate = new Date(date);
    const dateTimeStr = thisDate.toLocaleString('en-US', {
      timeZone: 'America/New_York',
    });
    const timeStr = dateTimeStr.split(', ')[1];
    const [rawHours, minutes, remainder] = timeStr.split(':');
    const amPm = remainder.split(' ')[1];
    const hours = amPm === 'PM' ? parseInt(rawHours) + 12 + '' : rawHours;
    return `${hours.length < 2 ? '0' + hours : hours}:${
      minutes.length < 2 ? '0' + minutes : minutes
    }`;
  },
  dateNowInput: () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
  },
  lastWeek: () => {
    const now = new Date();
    const lastWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 6
    );
    const year = lastWeek.getFullYear().toString();
    const month =
      lastWeek.getMonth() + 1 < 10
        ? `0${lastWeek.getMonth() + 1}`
        : lastWeek.getMonth() + 1 + '';
    const day =
      lastWeek.getDate() < 10
        ? `0${lastWeek.getDate()}`
        : lastWeek.getDate().toString();
    return `${year}-${month}-${day}`;
  },
  monthsBack: (month) => {
    const nMonthsBack = parseInt(month);
    const getDaysInMonth = (year, month) => {
      return new Date(year, month, 0).getDate();
    };
    const newDate = new Date();
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() - nMonthsBack);
    const now = new Date();
    newDate.setDate(
      Math.min(
        now.getDate(),
        getDaysInMonth(now.getFullYear(), now.getMonth() + 1)
      )
    );
    return `${newDate.getFullYear()}-${
      newDate.getMonth() + 1 < 10
        ? '0' + (newDate.getMonth() + 1)
        : newDate.getMonth() + 1
    }-${
      newDate.getDate() < 10
        ? '0' + newDate.getDate().toString()
        : newDate.getDate()
    }`;
  },
  timeNowInput: () => {
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-US', {
      timeZone: 'America/New_York',
    });
    const timeString = dateTimeString.split(', ')[1];
    const [rawHours, minutes, remainder] = timeString.split(':');
    const amPm = remainder.split(' ')[1];
    const hours = amPm === 'PM' ? parseInt(rawHours) + 12 + '' : rawHours;
    return `${hours.length < 2 ? '0' + hours : hours}:${
      minutes.length < 2 ? '0' + minutes : minutes
    }`;
  },
  thisYear: () => {
    const now = new Date();
    return `${now.getFullYear().toString()}-01-01`;
  },
  copyright: () => {
    const now = new Date();
    const year = now.getFullYear();
    if (year > 2020) return `-${year.toString()}`;
    return '';
  },
};
