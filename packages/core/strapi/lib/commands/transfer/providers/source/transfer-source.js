'use strict';

const TransferProvider = require('..');

class TransferSource extends TransferProvider {
  constructor(config, providerName) {
    super(config, 'source', providerName);
  }

  async getSchema() {
    throw new Error('must override getSchema');
  }

  async getDataStream() {
    throw new Error('must override getDataStream');
  }
}

module.exports = TransferSource;
