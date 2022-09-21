'use strict';

const createConnection = require('@strapi/database/lib/connection');
const TransferDestination = require('./transfer-destination');

const providerName = 'strapi.database';

class StrapiDatabaseDestination extends TransferDestination {
  // this.conn - connection to database
  // this.config - this provider's configuration

  constructor(config) {
    super(config, providerName);
    console.log('creating StrapiDatabaseDestination');
    this.on('after-create-destination', () => this.connectToDB({ config: this.config }));
  }

  async connectToDB({ config }) {
    console.log('creating connection for', config.connection);
    this.conn = await createConnection(config.connection);
    console.log('created connection', !!this.conn);
  }

  /**
   * validate the schema
   *
   * NOTE: ideally, a "restore" should be able to create the schema on the destination in this step,
   * but for the current scope we will require it to already exist
   *
   * TODO:
   * - load destination schema from database // maybe we should do this ahead of time in initialization?
   * - compare against source schema in params.schema
   *
   * @param {StrapiSchema} params.schema
   *
   */
  async compareSourceSchema(params) {
    super.compareSourceSchema(params);

    const { schema, config } = params;

    console.log('validating source schema', schema, config);
  }

  async onData(data /* , params */) {
    console.log('strapidatabase received data', data);

    // TODO: insert data into database
  }
}

module.exports = StrapiDatabaseDestination;
