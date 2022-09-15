'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

/**
 * Updates the leafs of the first argument
 *
 * @param {string} filename
 *
 * @returns {object}
 *
 */

function loadTransferConfig(filename, options) {
  const extension = path.extname(filename);

  if (extension === '.js') {
    console.log('js file');
    const filepath = path.join(process.cwd(), filename);
    console.log('filepath', filepath);
    const config = require(filepath);
    return config(options);
  }
  if (extension === '.json') {
    return fs.readFileSync(filename);
  }
}

module.exports = async function transfer(args) {
  console.log(chalk.yellow('args'), args);
  // console.log(chalk.yellow('options'), options);

  const config = await loadTransferConfig(args.C, args);

  console.log('config', config);
  process.exit(0);
};
