'use strict';

const createConnection = require('@strapi/database/lib/connection');
const TransferDestination = require('./transfer-destination');

const providerName = 'strapi.database';

class StrapiDatabaseDestination extends TransferDestination {
  // this.conn - connection to database
  // this.config - this provider's configuration

  constructor(config) {
    super(config, providerName);
    console.log('creating StrapiDatabaseDestination', this.config);
    this.on('after-create-destination', () => this.connectToDB({ config: this.config }));
  }

  async connectToDB({ config }) {
    console.log('creating connection for', config.connection);
    this.conn = await createConnection(config.connection);
    console.log('created connection', this.conn);
  }

  /**
   * validate the schema
   *
   * TODO:
   * - connect to database
   * - pull schema
   * - compare against params.schema
   *
   * @param {StrapiSchema} params.schema
   *
   */
  validateSchema(params) {
    super.validateSchema(params);

    const { schema, config } = params;

    console.log('validating schema', schema, config);
  }
}

module.exports = StrapiDatabaseDestination;
