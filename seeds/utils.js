/**
 * random seeding utils
 */

'use strict';

const { adjectives, nouns, vendors } = require('./lists');

const randomNumber = (min = 0, max = 24) => {
 return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateItem = () => {
  const adjective = adjectives[randomNumber(0, 24)];
  const noun = nouns[randomNumber(0, 24)];
  const coinToss = randomNumber(0, 1);
  const entropy = coinToss ? (adjectives[randomNumber(0, 24)]) + ' ' : '';
  return `${entropy}${adjective} ${noun}`;
};

const generateVendor = () => {
  return vendors[randomNumber(0, 9)];
};

const generateDate = () => {
  const newDate = new Date();
  newDate.setDate(randomNumber(1, 30));
  newDate.setHours(randomNumber(0, 23), randomNumber(1, 59));
  return newDate;
};

const seedDb = async (model, seeds) => {
  try {
    model.collection.drop();
  } catch (err) {
    console.log(err);
  }
  return Promise.all(seeds.map((seed) => new model(seed).save()));
};

module.exports = {
  generateItem,
  generateVendor,
  generateDate,
  randomNumber,
  seedDb,
};
