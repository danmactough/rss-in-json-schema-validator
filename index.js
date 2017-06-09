const Ajv = require('ajv');
const schema = require('./schema');

function createValidator (options) {
  const ajv = new Ajv(options);
  return ajv.compile(schema);
}

const validate = createValidator({
  allErrors: true,
  extendRefs: 'fail'
});

module.exports = { schema, validate, createValidator };
