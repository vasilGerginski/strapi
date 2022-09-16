'use strict';

const TransferProvider = require('..');

class TransferDestination extends TransferProvider {
  constructor(config, providerName) {
    super(config, 'destination', providerName);
  }

  validateSchema() {
    throw new Error('must override validateSchema');
  }
}

module.exports = TransferDestination;
