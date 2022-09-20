'use strict';

const TransferProvider = require('..');

class TransferDestination extends TransferProvider {
  constructor(config, providerName) {
    super(config, 'destination', providerName);
  }

  async compareSourceSchema() {
    // don't do anything for now
  }

  async onData(/* data, params */) {
    console.warn('TransferDestination should be overridden');
  }
}

module.exports = TransferDestination;
