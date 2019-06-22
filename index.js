const { parse } = require('./src/parser')
const { tokenize } = require('./src/tokenizer')
const { isValidQl } = require('./src/validator')
const { Store, setSchema, getSchema } = require('./src/store')

/**
 * Function that initializes the registry
 * @returns {Object} The registry object
 */

/**
 * @type {Object} The list of schemas
 */
const getStore = function () {

  const isBrowser = new Function("try { return this===window }catch(e){ return false }")

  if (isBrowser()) {
    if (!localStorage.getItem('schemaKey')) {
      localStorage.setItem('schemaKey', Math.random().toString())
    }

    let storeKey = localStorage.getItem('schemaKey')

    if (!localStorage.getItem(storeKey)) {
      localStorage.setItem(storeKey, JSON.stringify(Store))
    }
    return JSON.parse(localStorage.getItem(storeKey))
  }

  else return Store

}


const registry = {

  store: getStore(),

  /**
   * Returns a scaffolded object based on the schema name from the registry
   * @param {string} schemaName The name of the schema to scaffold
   * @returns {Object} The scaffolded object
   */
  scaffold: function (schemaName) {
    return getSchema(schemaName, this.store)
  },

  /**
   * Used to register schemas in the registry
   * @param {qlString} qlString 
   */
  register: function (qlString) {
    if (!isValidQl(qlString)) throw new Error('Invalid QL String')
    const tokenizedArr = tokenize(qlString)
    const [parsed, typeMap] = parse(tokenizedArr)
    const schema = Object.keys(typeMap).reduce((a, key) => ({ ...a, [key]: parsed[key] }), {})
    setSchema(schema, this.store)
    localStorage.setItem(localStorage.getItem('schemaKey'), JSON.stringify(this.store))
  }

}

/**
 * Returns a scaffolded object based on the query string
 * @param {string} qlString The query string to scaffold
 * @returns {Object} The scaffolded object
 */
const scaffold = function (qlString) {
  if (!isValidQl(qlString)) throw new Error('Invalid QL String')
  const [parsed] = parse(tokenize(qlString))
  return parsed
}


module.exports = {
  registry, scaffold
}
