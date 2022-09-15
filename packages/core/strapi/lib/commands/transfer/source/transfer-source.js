'use strict';

class TransferSource {
  constructor(config) {
    this.config = config; // TODO: clone?
  }

  runHook(name, params) {
    console.log('hook', name, params);
    if (this.config.source[name]) {
      console.log('-- exists in config');
    }
  }

  getSchema() {
    throw new Error('must override getSchema');
  }

  getDataStream() {
    throw new Error('must override getDataStream');
  }
}

module.exports = TransferSource;
