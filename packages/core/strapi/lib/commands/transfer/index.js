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

  const config = await loadTransferConfig(args.C, args); // TODO: allow separate source/destination configs instead of only one file with both
  console.log('config', JSON.stringify(config, null, 2));

  // Excuse the ugliness here, just a PoC :)
  // In the real version, everything in the providers folder should be moved somewhere like @strapi/transfer to be usable in strapi instead of only the CLI

  let source;
  let destination;
  const supportedSources = ['strapi.file']; // TODO: this should come from something that reads from the providers folder
  if (supportedSources.includes(config.source.type)) {
    const Source = require(`./providers/source/${config.source.type}`);
    source = new Source(config);
  }

  const supportedDestinations = ['strapi.database']; // TODO: this should come from something that reads from the providers folder
  if (supportedDestinations.includes(config.destination.type)) {
    const Destination = require(`./providers/destination/${config.destination.type}`);
    destination = new Destination(config);
  }

  await Promise.all([
    // after-create-* hooks are where we can handle things like "open file handle", "open db connection", etc
    source.runHook('after-create-source', { config, destination }),
    destination.runHook('after-create-destination', { config, source }),

    // I can't think of a specific use-case for listening to the other side being created, but it doesn't hurt
    source.runHook('after-create-destination', { config, destination }),
    destination.runHook('after-create-source', { config, source }),
  ]);

  // load schema from source
  await source.runHook('before-load-schema', { config });
  await destination.runHook('before-load-schema', { config });
  const schema = await source.getSchema({ config, destination });

  /**
   * TODO: real version shouldn't work like this.
   * There needs to be some priority for which side sees the other's schema first, so that one is able to mirror the other.
   * A flag in the config indicating that one side requires to see the opposing schema first?
   */
  await source.runHook('after-load-schema', { config });
  // this is where a destination planning to create a schema based on what it's receiving should create that schema, for example during a transfer to file or a full restore of strapi that drops and recreates schema
  await destination.runHook('after-load-schema', { config });

  // validate schema
  await source.runHook('before-validate-schema', { config, source, schema });
  await destination.runHook('before-validate-schema', { config, source, schema });
  await destination.compareSourceSchema({ config, source, schema });
  await source.runHook('after-validate-schema', { config, source, schema });
  await destination.runHook('after-validate-schema', { config, source, schema });

  /**
   * TODO: real version might need one or both:
   * - a throttle on source to avoid filling up memory on CLI system
   * - replace the onData hook method (which was simplest to implement in this poc) with a way for destination to pass a stream object to the source to use to pipe data through
   * should do some tests first to see if it's worth it, because that feels like it would be more complex and less flexible
   *
   * */
  // source sends data to destination via the data hook
  source.on('data', async (data) => {
    // TODO: pipe this through the hooks here?
    await destination.onData(data);
  });

  // source notifies when it's finished sending data
  source.on('complete', async (params) => {
    await destination.onComplete(params);
    process.exit(0);
  });

  await source.startDataTransfer();

  process.exit(0);
};
