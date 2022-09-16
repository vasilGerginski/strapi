'use strict';

const TransferSource = require('./transfer-source');

const providerName = 'strapi.file';

class StrapiFileSource extends TransferSource {
  constructor(config) {
    super(config, providerName);
  }

  loadSchema() {
    console.log('loading schema');

    // TODO: load this from file
    return {
      test: 'foo',
    };
  }

  startDataTransfer() {
    // Load the file
    // streaming it passing each chunk to runHook('data', data)
  }
}

module.exports = StrapiFileSource;
