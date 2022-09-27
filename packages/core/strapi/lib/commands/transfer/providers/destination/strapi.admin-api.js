'use strict';

const fetch = require('node-fetch');
const TransferDestination = require('./transfer-destination');

const providerName = 'strapi.admin-api';

// ABANDONED: we're not going this route for now and instead focusing on database transfers

class StrapiAdminApiDestination extends TransferDestination {
  // this.config - this provider's configuration

  constructor(config) {
    super(config, providerName);
  }

  /**
   * validate the schema
   *
   * NOTE: ideally, a "restore" should be able to create the schema on the destination in this step,
   * but for the current scope we will require it to already exist
   *
   * @param {StrapiSchema} params.schema
   *
   */
  async compareSourceSchema(params) {
    super.compareSourceSchema(params);
    const sourceSchema = params.schema;

    // retrieve schema from admin api
    // NOTE: doing this means that this content-type-builder needs to be stable between versions, we may need to version this
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

    // Schemas don't have to match perfectly, the only requirement is that fields that exist in the source schema must also exist in the destination with the same data type
    console.log('destination schema', data);
    // console.log('source schema', sourceSchema);

    /**
     * TODO: define a standardized minimal schema format that defines content type name, fields and types, and relations (including components, dynamic zones)
     *
     * ideally, it should not require all the data in a normal strapi content type definition (like displayName, options, pluginOptions, etc)
     * but they should be allowed so that in the future we can potentially provide enough information for a destination to create the schema for a full restore
     *
     */

    // it should that could potentially be extended to copy a strapi schema itself to a destination
    sourceSchema.contentTypes.forEach((contentTypeDef) => {
      const { kind, collectionName, attributes } = contentTypeDef;
      console.log('source contentTypeDef', contentTypeDef);

      if (kind === 'collectionType') {
        console.log(`has collection ${collectionName} with attributes`, attributes);
        return;
      }
      throw new Error('schema mismatch');
    });
  }

  async onData(data /* , params */) {
    console.log('StrapiAdminApi received data', data);

    // TODO: make api call to create record
  }
}

module.exports = StrapiAdminApiDestination;
