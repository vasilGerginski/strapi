const path = require('path');

module.exports = (args) => {
  console.log('Loading config');

  return {
    source: {
      // TODO: We don't need to state the type if we already have the key present below
      type: 'strapi.file',
      // TODO: does it add anything to use the type as the config? is there a better work that still works with typings?
      'strapi.file': {
        filename: './data/backup-sample.json',
        zip: false,
        encrypt: false,
      },
    },
    // TODO: same issues regarding config keys stated in source
    destination: {
      type: 'strapi.admin-api',
      'strapi.admin-api': {
        // TODO: to make this work, put a valid bearer token here
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxODYxMjQ1LCJleHAiOjE2NjQ0NTMyNDV9.ZndyVN3turu1NWnws-ZhmQRMtDr-xoD7TtGu8wdELSY',
        url: 'http://localhost:1337',
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
          'before-schema-validation': ({ schema, transferConfig, transferStatus }) => {
            console.log('after-transfer');
          },
          'after-schema-validation': ({ schema, transferConfig, transferStatus }) => {
            console.log('after-transfer');
          },
          'before-transfer-start': ({ schema, transferConfig, transferStatus }) => {
            console.log('before-transfer-start');
          },
          'before-data': ({ schema, transferConfig, transferStatus }) => {
            console.log('before-data');
          },
          'transfer-complete': ({ schema, transferConfig, transferStatus }) => {
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
