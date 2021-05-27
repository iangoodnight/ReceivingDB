'use strict';

const { Entry } = require('../src/models');

const entrySeed = require('./entry.seed');

const { seedDb } = require('./utils');

require('dotenv').config();

const db = require('../src/services/db.service');

let exit = 0;

db.on('error', console.error.bind(console, 'MongoDB error: '));
db.once('open', () => {
  seedDb(Entry, entrySeed)
    .then(() => {
      console.log('Seeded entries');
    })
    .catch(err => {
      exit = 1;
      console.log('Something went wrong: ', err);
    })
    .finally(() => {
      process.exit(exit);
    });
});
