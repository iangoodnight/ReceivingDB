/**
 * entry crud
 */

'use strict';

const { Entry } = require('../models');
const {
  date: { subtractDaysFromToday },
  entry: { flatten },
  page: { browse, newEntry, view },
  route: { generatePageDetails },
} = require('../utils');

module.exports = {
  // CREATE
  create: async (req, res) => {
    try {
      const { body } = req;
      const {
        user: {
          name: { firstName, lastName },
        },
      } = req;
      body.receivedBy = `${firstName} ${lastName}`;
      const newEntry = await Entry.create(body);
      res.json({ success: true, data: newEntry });
    } catch (err) {
      res.json({ success: false, data: err });
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
      const [page, pageDetails] = generatePageDetails(req, view);
      pageDetails.data = [entry];
      pageDetails.success = true;
      res.render(page, pageDetails);
    } catch (err) {
      next(err);
    }
  },
  findByPoAndRender: async (req, res, next) => {
    try {
      const purchaseOrder = req.params.purchaseOrder;
      const filter = { purchaseOrder };
      const entries = await Entry.find(filter).lean();
      const [page, pageDetails] = generatePageDetails(req, view);
      pageDetails.data = entries;
      pageDetails.success = true;
      res.render(page, pageDetails);
    } catch (err) {
      next(err);
    }
  },
  findForAuditAndRender: async (req, res, next) => {
    try {
      const { id } = req.params;
      const entry = await Entry.findById(id).lean();
      const [page, pageDetails] = generatePageDetails(req, newEntry);
      pageDetails.data = entry;
      pageDetails.success = true;
      res.render(page, pageDetails);
    } catch (err) {
      next(err);
    }
  },
  findLastNDays: async (req, res, next) => {
    const start = req.query.start || 1;
    const end = +req.query.end || 0;
    const filter = req.query.filter || null;
    const value = decodeURI(req.query.value) || null;
    const filterString =
      filter === 'vendor'
        ? filter
        : filter === 'nepNumber'
        ? 'items.nepNumber'
        : null;
    const startDate = subtractDaysFromToday(start);
    const endDate = end === 0 ? Date.now() : subtractDaysFromToday(end - 1);
    const dateQuery = { date: { $gte: startDate, $lte: endDate } };
    const compoundQuery = {
      [filterString]: value,
      date: { $gte: startDate, $lte: endDate },
    };
    try {
      const query = filter ? compoundQuery : dateQuery;
      const entries = await Entry.find(query);
      const flattened = flatten(entries);
      const [page, pageDetails] = generatePageDetails(req, browse);
      let data;
      if (filter === 'nepNumber') {
        data = flattened.filter((line) => line.nepNumber === value);
      } else {
        data = [...flattened];
      }
      pageDetails.start = start;
      pageDetails.end = end <= 0 ? 0 : end;
      pageDetails.count = data.length;
      pageDetails.data = data;
      pageDetails.success = true;
      res.render(page, pageDetails);
    } catch (err) {
      next(err);
    }
  },
  // UPDATE
  auditEntry: async (req, res, next) => {
    try {
      const updates = req.body;
      const _id = req.params.id;
      const { user } = req;
      const {
        name: { firstName, lastName },
      } = user;
      console.log('Updated', updates);
      const audited = { by: firstName + ' ' + lastName, date: Date.now() };
      const entry = await Entry.findOne({ _id });
      for (const update in updates) {
        if (Object.prototype.hasOwnProperty.call(updates, update)) {
          entry[update] = updates[update];
        }
      }
      entry.audited = audited;
      console.log('Entry', entry);
      const doc = await entry.save();
      console.log('Doc', doc);
      res.json({ success: false, data: { message: 'J/K' } });
    } catch (err) {
      console.log(err);
      res.json({ success: false, data: { message: 'Something went wrong' } });
    }
  },
};
