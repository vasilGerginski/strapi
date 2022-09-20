'use strict';

const TransferProvider = require('..');

class TransferSource extends TransferProvider {
  constructor(config, providerName) {
    super(config, 'source', providerName);
  }

  async getSchema() {
    throw new Error('must override getSchema');
  }
}

module.exports = TransferSource;
