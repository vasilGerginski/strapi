'use strict';

const TransferSource = require('./transfer-source');

const providerName = 'strapi.file';

class StrapiFileSource extends TransferSource {
  constructor(config) {
    super(config, providerName);
    // register a hook to be called as soon as this object as been created which opens the file to be read from
    this.on('after-create-source', async () => {
      // TODO: open the filestream
    });
  }

  async loadSchema(/* { destination, config } */) {
    console.log('loading schema');

    // TODO: load this from file
    return {
      test: 'foo',
    };
  }

  async startDataTransfer() {
    // Load the file
    // streaming it passing each chunk to runHook('data', data)
  }
}

module.exports = StrapiFileSource;
