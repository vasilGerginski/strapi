'use strict';

const _ = require('lodash/fp');

class TransferProvider {
  // this.hooks = array of internal hooks
  // this.config = config object for this provider

  constructor(config, type, providerName) {
    console.log('constructor', config, type, providerName);
    this.config = config[type][providerName]; // TODO: clone?
  }

  // set a hook
  on(hook, callback) {
    if (!this.hooks) this.hooks = [];
    if (!this.hooks[hook]) {
      this.hooks[hook] = [];
    }
    this.hooks[hook].push({ callback });
  }

  async runHook(hook, params) {
    console.log('this.confing', this.config);
    // call internal hooks
    if (_.isArray(this.hooks) && _.isArray(this.hooks[hook])) {
      await Promise.all(this.hooks[hook].map(({ callback }) => callback(params)));
    }
    // call config hooks
    if (_.isArray(this.config.hooks) && this.config.hooks[hook]) {
      let runHooks = this.config.hooks[hook];
      if (!_.isArray(runHooks)) {
        runHooks = [runHooks];
      }
      await Promise.all(this.hooks[hook].map(({ callback }) => callback(params)));
    }
  }
}

module.exports = TransferProvider;
