'use strict';

const TransferSource = require('./transfer-source');

class StrapiFileSource extends TransferSource {
  constructor(config) {
    super(config);
    console.log('creating StrapiFileSource', this.config);
  }
}

module.exports = StrapiFileSource;
