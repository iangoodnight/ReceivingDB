/**
 * transform entries for client
 */

'use strict';

const { friendlyTimeAndDate } = require('./date.utils');

module.exports = {
  flatten: (entries) => {
    return entries
      .map((entry) => {
        const {
          _id,
          carrier,
          date,
          intendedFor,
          items,
          purchaseOrder,
          receivedBy,
          vendor,
        } = entry;
        const [day, time] = friendlyTimeAndDate(date);
        return items.map((received) => {
          const {
            item,
            lot,
            nepNumber,
            quantity: { number, unit },
            vendorLot,
          } = received;
          const qty = `${number} ${unit}`;
          return {
            _id,
            carrier,
            day,
            intendedFor,
            item,
            lot,
            nepNumber,
            purchaseOrder,
            time,
            qty,
            receivedBy,
            vendor,
            vendorLot,
          };
        });
      })
      .flat();
  },
};
