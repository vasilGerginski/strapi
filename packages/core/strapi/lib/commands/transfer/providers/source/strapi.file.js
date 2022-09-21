'use strict';

const fs = require('fs');

const TransferSource = require('./transfer-source');

const providerName = 'strapi.file';

// TODO: right now for PoC we're loading the whole file and then sending it in pieces.
// the real version should use https://www.npmjs.com/package/stream-json for streaming json, with example for gzipped file

class StrapiFileSource extends TransferSource {
  // this.fileContents // this is temporary even for PoC, will be replaced with stream-json method

  constructor(config) {
    super(config, providerName);
    // register a hook to be called as soon as this object as been created which opens the file to be read from
    this.on('after-create-source', async () => {
      console.log('opening file', this.config.filename);
      this.fileContents = JSON.parse(fs.readFileSync(this.config.filename));
    });
  }

  async getSchema(/* { destination, config } */) {
    return this.fileContents.schema;
  }

  async startDataTransfer() {
    // NOTE: this is horrible on purpose because we just need a fake poc stream; will replace with stream-json later
    console.log('starting transfer', this.fileContents);
    this.fileContents.data.forEach((data) => {
      queueMicrotask(() => {
        this.runHook('data', data);
      });
    });
  }
}

module.exports = StrapiFileSource;
