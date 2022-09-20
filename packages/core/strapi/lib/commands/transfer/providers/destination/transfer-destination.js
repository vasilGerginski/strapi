'use strict';

const TransferProvider = require('..');

class TransferDestination extends TransferProvider {
  constructor(config, providerName) {
    super(config, 'destination', providerName);
  }

  async validateSchema() {
    // don't do anything for now
  }
}

module.exports = TransferDestination;
