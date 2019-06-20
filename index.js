const { parse } = require('./src/parser')
const { tokenize } = require('./src/tokenizer')
const { isValidQl } = require('./src/validator')
const { Store } = require('./src/store')

/**
 * Function that initializes the registry
 * @returns {Object} The registry object
 */
const init = () => ({
  /**
   * @type {Object} The list of schemas
   */
  schemaPool: Store,

  /**
   * Returns a scaffolded object based on the schema name from the registry
   * @param {string} schemaName The name of the schema to scaffold
   * @returns {Object} The scaffolded object
   */
  scaffoldSchema: function (schemaName) {
    return this.schemaPool.getSchema(schemaName)
  },

  /**
   * Returns a scaffolded object based on the query string
   * @param {string} qlString The query string to scaffold
   * @returns {Object} The scaffolded object
   */
  scaffold: function (qlString) {
    if (!isValidQl(qlString)) throw new Error('Invalid QL String')
    const [parsed] = parse(tokenize(qlString))
    return parsed
  },

  /**
   * Used to register schemas in the registry
   * @param {qlString} qlString 
   */
  registerSchema: function (qlString) {
    if (!isValidQl(qlString)) throw new Error('Invalid QL String')
    const tokenizedArr = tokenize(qlString)
    const [parsed, typeMap] = parse(tokenizedArr)
    const schema = Object.keys(typeMap).reduce((a, key) => ({ ...a, [key]: parsed[key] }), {})
    this.schemaPool.register(schema)
  }

})

module.exports = {
  init
}
