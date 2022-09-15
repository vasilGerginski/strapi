const path = require('path');

module.exports = (args) => {
  console.log('Loading config');

  return {
    source: {
      type: 'strapi.file',
      'strapi.file.config': {
        filename: 'backup-sample.json',
      },
    },
    destination: {
      type: 'strapi.database',
      'strapi.database.config': {
        connection: {
          client: 'sqlite',
          connection: {
            filename: path.join('..', 'getstarted', '.tmp/data.db'),
          },
          useNullAsDefault: true,
        },
      },
    },
  };
};
