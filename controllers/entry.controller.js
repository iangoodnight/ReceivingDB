/**
 * entry crud
 */

'use strict';

const { Entry } = require('../models');
const {
  date: { subtractDaysFromToday },
  entry: { flatten },
} = require('../utils');
const {
  page: { browse },
} = require('../utils');

module.exports = {
  // CREATE
  create: async (req, res, next) => {
    try {
      const newEntry = await Entry.create(req.body);
      res.json({ success: true, data: newEntry });
    } catch (err) {
      next(err);
    }
  },
  // READ
  findById: async (req, res, next) => {
    try {
      const entry = await Entry.findById(req.params.id);
      res.json({ success: true, data: entry });
    } catch (err) {
      next(err);
    }
  },
  findLastNDays: async (req, res, next) => {
    const start = req.query.start || 1;
    const end = req.query.end || 0;
    const startDate = subtractDaysFromToday(start);
    const endDate = end === 0 ? Date.now() : subtractDaysFromToday(end - 1);
    const query = { date: { $gte: startDate, $lte: endDate } };
    try {
      const entries = await Entry.find(query);
      const data = flatten(entries);
      const { bodyClass, mainClass, page, title } = browse;
      const { user } = req;
      const admin = user.roles.indexOf('ADMIN') !== -1;
      const success = true;
      res.render(page, {
        admin,
        bodyClass,
        data,
        mainClass,
        success,
        title,
        user,
      });
    } catch (err) {
      next(err);
    }
  },
};
