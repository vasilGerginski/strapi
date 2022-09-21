'use strict';

const fetch = require('node-fetch');
const TransferDestination = require('./transfer-destination');

const providerName = 'strapi.admin-api';

class StrapiAdminApiDestination extends TransferDestination {
  // this.conn - connection to database
  // this.config - this provider's configuration

  constructor(config) {
    super(config, providerName);
    // this.on('after-create-destination', () => this.testCredentials({ config: this.config }));
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

    console.log('retrieving destination schema');

    const options = {
      method: 'get',
      headers: {
        authorization: `Bearer ${this.config.token}`,
      },
    };
    const response = await fetch(`${this.config.url}/content-type-builder/content-types`, options);
    const data = await response.json();
    if (!data) {
      throw new Error("couldn't retrieve schema from destination admin-api");
    }
    console.log('data', data);
  }

  async onData(data /* , params */) {
    console.log('StrapiAdminApi received data', data);

    // TODO: make api call to create record
  }
}

module.exports = StrapiAdminApiDestination;
