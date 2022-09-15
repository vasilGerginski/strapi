'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

/**
 * Load the config file
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
  // The real version should load these from something like @strapi/transfer which can be shared with strapi itself so they can be used without the CLI
  let source;
  let destination;

  if (config.source.type === 'strapi.file') {
    const Source = require('./source/strapi.file');
    source = new Source(config);
    console.log('source created', !!source);
  }

  if (config.destination.type === 'strapi.file') {
    const Destination = require('./destination/strapi.database');
    destination = new Destination(config);
    console.log('destination created', !!destination);
  }

  process.exit(0);
};
