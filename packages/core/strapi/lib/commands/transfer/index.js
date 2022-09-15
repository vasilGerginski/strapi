'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

/**
 * Load the transfer config file
 *
 * @param {string} filename
 *
 * @returns {object}
 *
 */
function loadTransferConfig(filename, options) {
  const extension = path.extname(filename);

  if (extension === '.js') {
    const filepath = path.join(process.cwd(), filename);
    const config = require(filepath);
    return config(options);
  }
  if (extension === '.json') {
    return fs.readFileSync(filename);
  }

  throw new Error('invalid or missing config file');
}

/**
 *
 * @param {*} args
 */
module.exports = async function transfer(args) {
  console.log(chalk.yellow('args'), args);

  const config = await loadTransferConfig(args.C, args);
  console.log('config', JSON.stringify(config, null, 2));

  // Excuse the ugliness here, just a PoC :)
  // The real version should exist somewhere like @strapi/transfer to be usable in strapi instead of only the CLI

  let source;
  let destination;
  const supportedSources = ['strapi.file'];
  if (supportedSources.includes(config.source.type)) {
    const Source = require('./source/strapi.file');
    source = new Source(config);
    source.runHook('after-create-source', { config });
    console.log('source created', !!source);
  }

  const supportedDestinations = ['strapi.database'];
  if (supportedDestinations.includes(config.destination.type)) {
    const Destination = require(`./destination/${config.destination.type}`);
    destination = new Destination(config);
    console.log('destination created', !!destination);
  }

  source.runHook('after-create-source', { config, destination });
  source.runHook('after-create-destination', { config, destination });
  destination.runHook('after-create-source', { config, source });
  destination.runHook('after-create-destination', { config, source });

  // should throw if there's a problem
  destination.validateSourceSchema({ config, source });

  // TODO: pipe data stream from source to destination

  process.exit(0);
};
