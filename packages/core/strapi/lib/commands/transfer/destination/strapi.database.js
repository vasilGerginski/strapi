'use strict';

const TransferDestination = require('./destination');

class StrapiDatabaseDestination extends TransferDestination {
  constructor(config) {
    super(config);
    console.log('creating StrapiDatabaseDestination');
  }
}

module.exports = StrapiDatabaseDestination;
