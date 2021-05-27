/**
 * seed entry db
 */

'use strict';

const {
  generateDate,
  generateItem,
  generateVendor,
  randomNumber,
} = require('./utils');

module.exports = (() => {
  const entrySeed = [];
  let i = 0;
  while (i < 300) {
    const carrier = ['UPS', 'USPS', 'FEDEX'][randomNumber(0, 2)];
    const date = generateDate();
    const intendedFor = ['BULK', 'NAT ESS', 'IT'][randomNumber(0, 2)];
    const purchaseOrder = randomNumber(1_000, 9_999);
    const receivedBy = 'BOZENA';
    const vendor = generateVendor();
    const numItems = randomNumber(1, 4);
    let items = [];
    for (let j = 0; j < numItems; j++) {
      const item = generateItem();
      const nepNumber =
        `${randomNumber(100, 999)}-${randomNumber(100, 200)}-0${i}${j}`;
      const quantity = {
        number: randomNumber(100, 2_000),
        unit: ['each', 'lbs', 'units'][randomNumber(0, 2)],
      };
      const vendorLot =
        `${['A','T','R'][randomNumber(0, 2)]}-${randomNumber(100, 999)}`;
      items.push({
        item,
        nepNumber,
        quantity,
        vendorLot,
      });
    }
    const entry = {
      carrier,
      date,
      intendedFor,
      items,
      purchaseOrder,
      receivedBy,
      vendor,
    };
    entrySeed.push(entry);
    i++;
  }
  return entrySeed;
})();
