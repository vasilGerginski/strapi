const path = require('path');

module.exports = (args) => {
  console.log('Loading config');

  return {
    destination: {
      type: 'strapi.file',
      'strapi.file.config': {
        filename: 'backup-getstarted.json',
        zip: false,
        encrypt: false,
      },
    },
    source: {
      type: 'strapi.database',
      'strapi.database.config': {
        connection: {
          client: 'sqlite',
          connection: {
            filename: path.join('..', 'getstarted', '.tmp', 'data.db'),
          },
          useNullAsDefault: true,
        },
      },
    },
  };
};
