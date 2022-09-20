const path = require('path');

module.exports = (args) => {
  console.log('Loading config');

  return {
    destination: {
      type: 'strapi.file',
      'strapi.file.config': {
        filename: '../data/backup-getstarted.json', // TODO: Should this be relative to config file or relative to CLI?
        zip: false, // TODO: is the source file zipped?
        encrypt: false, // TODO: is the source file encrypted? (need to add config for keyfile, password prompt, etc)
      },
    },
    source: {
      type: 'strapi.database',
      'strapi.database.config': {
        connection: {
          client: 'sqlite',
          connection: {
            filename: path.join('..', '..', 'getstarted', '.tmp', 'data.db'),
          },
          useNullAsDefault: true,
        },
      },
    },
  };
};
