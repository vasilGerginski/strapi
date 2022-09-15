'use strict';

const TransferDestination = require('./transfer-destination');

class StrapiDatabaseDestination extends TransferDestination {
  constructor(config) {
    super(config);
    console.log('creating StrapiDatabaseDestination', this.config);
  }
}

module.exports = StrapiDatabaseDestination;
