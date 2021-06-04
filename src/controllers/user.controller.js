/**
 * user crud
 */

'use strict';

const { User } = require('../models');
const {
  page: { user: userPage, userForm },
  route: { generatePageDetails },
} = require('../utils');

module.exports = {
  // CREATE
  create: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      const { _id, username, email } = newUser;
      const data = { _id, username, email };
      res.json({ success: true, data });
    } catch (err) {
      res.json({ success: false, message: err });
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
  findOneAndRender: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).lean();
      const [page, pageDetails] = generatePageDetails(req, userForm);
      const admin = user.roles.indexOf('ADMIN') !== -1;
      const audit = user.roles.indexOf('AUDIT') !== -1;
      const write = user.roles.indexOf('WRITE') !== -1;
      user.admin = admin;
      user.audit = audit;
      user.write = write;
      pageDetails.data = { user };
      pageDetails.success = true;
      res.render(page, pageDetails);
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
  findAndRender: async (req, res, next) => {
    try {
      const enabled = req.query.enabled || true;
      const query = { enabled };
      const users = await User.find(query).lean();
      const [page, pageDetails] = generatePageDetails(req, userPage);
      pageDetails.success = true;
      pageDetails.enabled = enabled === 'false' ? false : true;
      pageDetails.data = users;
      res.render(page, pageDetails);
    } catch (err) {
      next(err);
    }
  },
  // UPDATE
  update: async (req, res) => {
    const id = req.params.id;
    const updateOptions = {
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    };
    const operation = { $set: req.body };
    try {
      const updated = await User.findByIdAndUpdate(
        id,
        operation,
        updateOptions
      );
      res.json({ success: true, data: updated });
    } catch (err) {
      res.json({ success: false, message: err });
    }
  },
  // DELETE
  delete: async (req, res, next) => {
    const id = req.params.id;
    try {
      const deleted = await User.deleteOne({ _id: id });
      const { deletedCount } = deleted;
      res.json({ success: true, data: { deletedCount } });
    } catch (err) {
      next(err);
    }
  },
};
