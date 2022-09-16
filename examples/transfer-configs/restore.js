const path = require('path');

module.exports = (args) => {
  console.log('Loading config');

  return {
    source: {
      type: 'strapi.file',
      'strapi.file': {
        name: './data/backup-sample.json',
        zip: false,
        encrypt: false,
      },
    },
    destination: {
      type: 'strapi.database',
      'strapi.database': {
        connection: {
          client: 'sqlite',
          connection: {
            filename: path.join('..', 'getstarted', '.tmp', 'data.db'),
          },
          useNullAsDefault: true,
        },
        hooks: {
          // Example of each hook that is available
          // transferStatus could include total records transmitted, maybe a total/percent if the data is given in the preflight process
          'before-import-each': ({
            entity,
            entityOriginal,
            schema,
            transferConfig,
            transferStatus,
          }) => {
            console.log('after-transfer');
          },
          'after-import-each': ({
            entity,
            entityOriginal,
            schema,
            transferConfig,
            transferStatus,
          }) => {
            console.log('after-transfer');
          },
          'before-preflight': ({ schema, transferConfig, transferStatus }) => {
            console.log('after-transfer');
          },
          'after-preflight': ({ schema, transferConfig, transferStatus }) => {
            console.log('after-transfer');
          },
          'before-transfer': ({ schema, transferConfig, transferStatus }) => {
            console.log('after-transfer');
          },
          'after-transfer': ({ schema, transferConfig, transferStatus }) => {
            console.log('after-transfer');
          },

          // error could be used to attempt to resolve issues and retry, bypass a content item, etc
          // eg, if a rate limit is exceeded, could choose to wait and retry
          // if an entity can't be inserted because it's invalid, it could be corrected and retried, or bypassed
          'transfer-error': ({ error, schema, transferConfig, transferStatus }) => {
            console.log('transfer-error', error);
            return { retry: false };
          },
          'preflight-error': ({ error, schema, transferConfig, transferStatus }) => {
            console.log('preflight-error', error);
            return { retry: false };
          },
        },
      },
    },
  };
};
