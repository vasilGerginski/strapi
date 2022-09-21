'use strict';

const _ = require('lodash/fp');

/**
 *
 * TODO: add real definition
 * @typedef {() => void} TransferHookFunction
 *
 * TODO: add hooks here once we know what they are
 * @typedef {{
 * 'before-import-each': TransferHookFunction,
 * 'after-import-each': TransferHookFunction,
 * }} TransferHookList
 *
 * @typedef {{
 * filename: string,
 * zip: boolean,
 * encrypt: boolean
 * }} StrapiFileProviderOptions
 *
 * @typedef {{
 * type: string,
 * 'strapi.file': StrapiFileProviderOptions,
 * }} ProviderConfig
 */

class TransferProvider {
  // this.hooks = array of internal hooks
  // this.config = config object for this provider

  constructor(config, type, providerName) {
    if (!config?.[type]?.[providerName]) {
      console.error('missing config for', config, type, providerName);
      throw new Error('missing config');
    }

    /** @member {ProviderConfig} */
    this.config = config[type][providerName]; // TODO: clone?
    /** @member {Array} */
    this.hooks = [];
  }

  // register an internal hook
  on(hook, callback) {
    if (!this.hooks[hook]) {
      this.hooks[hook] = [];
    }
    this.hooks[hook].push({ callback });
  }

  async runHook(hook, params) {
    // call internal hooks
    if (_.isArray(this.hooks) && _.isArray(this.hooks[hook])) {
      await Promise.all(this.hooks[hook].map(({ callback }) => callback(params)));
    }
    // call user's config hooks
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
