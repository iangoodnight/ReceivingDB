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
  page: { browse, view },
  role: { isAdmin },
} = require('../utils');

module.exports = {
  // CREATE
  create: async (req, res, next) => {
    try {
      console.log(req.body);
      const newEntry = await Entry.create(req.body);
      res.json({ success: true, data: newEntry });
    } catch (err) {
      console.log(err);
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
  findByIdAndRender: async (req, res, next) => {
    try {
      const entry = await Entry.findById(req.params.id).lean();
      console.log(entry);
      const { user } = req;
      const admin = isAdmin(user);
      const { page } = view;
      const pageDetails = { ...view, admin, user, data: entry };
      res.render(page, pageDetails);
    } catch (err) {
      next(err);
    }
  },
  findLastNDays: async (req, res, next) => {
    const start = req.query.start || 1;
    const end = +req.query.end || 0;
    const startDate = subtractDaysFromToday(start);
    const endDate = end === 0 ? Date.now() : subtractDaysFromToday(end - 1);
    const query = { date: { $gte: startDate, $lte: endDate } };
    try {
      const entries = await Entry.find(query);
      const data = flatten(entries);
      const { page } = browse;
      const { user } = req;
      const admin = isAdmin(user);
      const pageDetails = { ...browse, admin, user, data, start, end };
      res.render(page, pageDetails);
    } catch (err) {
      next(err);
    }
  },
};
