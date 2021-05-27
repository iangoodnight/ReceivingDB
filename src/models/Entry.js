/**
 * Entry model
 * ingests counter model and item schema
 */

'use strict';

const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const itemSchema = new Schema(
  {
    item: {
      maxLength: 128,
      required: true,
      trim: true,
      type: String,
      uppercase: true,
    },
    lot: {
      type: Number,
    },
    nepNumber: {
      default: 'N/A',
      maxLength: 32,
      required: true,
      type: String,
      trim: true,
    },
    quantity: {
      number: {
        default: 1,
        max: 1_000_000,
        min: 1,
        type: Number,
      },
      unit: {
        default: 'each',
        lowercase: true,
        maxLength: 32,
        trim: true,
        type: String,
      },
    },
    vendorLot: {
      maxLength: 32,
      required: true,
      type: String,
      trim: true,
    },
  },
  schemaOptions
);

itemSchema.plugin(AutoIncrement, {
  id: 'lot_counter',
  inc_field: 'lot',
  start_seq: 1_000_000,
});

const entrySchema = new Schema(
  {
    carrier: {
      maxLength: 32,
      required: true,
      trim: true,
      type: String,
      uppercase: true,
    },
    date: {
      required: true,
      type: Date,
    },
    intendedFor: {
      default: 'Bulk',
      maxLength: 32,
      required: true,
      trim: true,
      type: String,
      uppercase: true,
    },
    items: [itemSchema],
    purchaseOrder: {
      default: 'N/A',
      maxLength: 16,
      required: true,
      trim: true,
      type: String,
      uppercase: true,
    },
    receivedBy: {
      maxLength: 32,
      required: true,
      trim: true,
      type: String,
      uppercase: true,
    },
    vendor: {
      maxLength: 32,
      required: true,
      trim: true,
      type: String,
      uppercase: true,
    },
  },
  schemaOptions
);

entrySchema.index({ date: -1 });

const Entry = model('Entry', entrySchema);

module.exports = Entry;
