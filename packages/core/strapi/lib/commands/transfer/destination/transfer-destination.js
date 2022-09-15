'use strict';

class TransferDestination {
  constructor(config) {
    this.config = config; // TODO: clone?
  }

  runHook(name, params) {
    console.log('hook', name, params);
    if (this.config.destination[name]) {
      console.log('-- exists in config');
    }
  }

  validateSourceSchema({ config, source }) {
    console.log('validateSourceSchema', config, source);
  }
}

module.exports = TransferDestination;
