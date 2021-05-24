/**
 * user crud
 */

'use strict';

const { User } = require('../models');

module.exports = {
  // CREATE
  create: async (req, res, next) => {
    try {
      const newUser = await User.create(req.body);
      const { _id, username, email } = newUser;
      const data = { _id, username, email };
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  // READ
  findById: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json({ success: true, data: users });
    } catch (err) {
      next(err);
    }
  },
  // UPDATE
  update: async (req, res, next) => {
    const id = req.params.id;
    const updateOptions = {
      new: true,
      runValidators: true,
    };
    const operation = { $set: req.body };
    try {
      const updated =
        await User.findByIdAndUpdate(id, operation, updateOptions);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },
  // DELETE
  delete: async (req, res, next) => {
    const id = req.params.id;
    try {
      const deleted = await User.deleteOne({ _id: id });
      const { deletedCount } = deleted;
      res.json({ success: true, data: { deletedCount }});
    } catch (err) {
      next(err);
    }
  },
}
