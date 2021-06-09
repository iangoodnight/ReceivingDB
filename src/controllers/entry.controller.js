/**
 * entry crud
 */

'use strict';

const { Entry } = require('../models');
const {
  date: { subtractDaysFromToday },
  entry: { flatten },
  object: { isEmptyObject, mergeDeep },
  page: { audit, browse, view },
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
      await Entry.create(body);
      res.json({ success: true });
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
      const [page, pageDetails] = generatePageDetails(req, audit);
      pageDetails.data = entry;
      pageDetails.success = true;
      pageDetails.audit = true;
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
      const audits = [];
      const _id = req.params.id;
      const { user } = req;
      const {
        name: { firstName, lastName },
      } = user;
      const auditor = `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
      const entry = await Entry.findOne({ _id });
      // Copy item changes if present
      const { items: updatedItems } = updates;
      for (const updatedItem of updatedItems) {
        const valid = !isEmptyObject(updatedItem);
        if (!valid) continue;
        const { _id: updateId = null } = updatedItem;
        const originalItem = !updateId
          ? {}
          : entry.items.filter(
              (original) => original._id.toString() === updateId
            )[0];
        for (const change in updatedItem) {
          if (Object.prototype.hasOwnProperty.call(updatedItem, change)) {
            let audit, message;
            switch (change) {
              case 'quantity':
                message =
                  'changed ' +
                  originalItem.item +
                  ' quantity from ' +
                  originalItem.quantity.number.toString() +
                  ' ' +
                  originalItem.quantity.unit +
                  ' to ' +
                  (updatedItem[change].number
                    ? updatedItem[change].number.toString()
                    : originalItem.quantity.number.toString()) +
                  ' ' +
                  (updatedItem[change].unit
                    ? updatedItem[change].unit
                    : originalItem.unit);
                audit = { auditor, change: message };
                audits.push(audit);
                break;
              case 'item':
                message = `changed item from ${originalItem.item} to ${updatedItem[change]}`;
                audit = { auditor, change: message };
                audits.push(audit);
                break;
              case 'nepNumber':
                message = `changed ${originalItem.item} MPN from ${originalItem.nepNumber} to ${updatedItem[change]}`;
                audit = { auditor, change: message };
                audits.push(audit);
                break;
              case 'vendorLot':
                message = `changed ${originalItem.item} vendor lot # from ${originalItem.nepNumber} to ${updatedItem[change]}`;
                audit = { auditor, change: message };
                audits.push(audit);
                break;
              default:
                break;
            }
          }
        }
        mergeDeep(originalItem, updatedItem);
      }
      delete updates.items;
      for (const remaining in updates) {
        if (Object.prototype.hasOwnProperty.call(updates, remaining)) {
          if (remaining === '_id') continue;
          const msg = `changed ${remaining} ${entry[remaining] || ''} to ${
            updates[remaining]
          }`;
          audits.push({ auditor, change: msg });
        }
      }
      mergeDeep(entry, updates);
      const { audits: pastAudits = [] } = entry;
      entry.audits = [...pastAudits, ...audits];
      await entry.save();
      res.json({ success: true });
    } catch (err) {
      res.json({ success: false, data: { message: 'Something went wrong' } });
    }
  },
};
