const { parse } = require('./src/parser')
const { tokenize } = require('./src/tokenizer')
const { isValidQl } = require('./src/validator')
const { Store } = require('./src/store')
/**
 * 
 * @param {string} qlString - The schema string containing the blueprint of the object to be scaffolded
 * @description - This is a function that returns a promise containing an object blueprint corresponding to the schema passed as the argument
 * @returns - A promise that resolves to an object with non-object properties having a null value
 */

const store = Store()

const scaffold = (schemaName) => {
  return store.getSchema(schemaName)
}

const register = (qlString) => {
  if (!isValidQl(qlString)) throw new Error('Invalid QL String')
  const tokenizedArr = tokenize(qlString)
  const [parsed, typeMap] = parse(tokenizedArr)
  const schema = Object.keys(typeMap).reduce((a, key) => ({ ...a, [key]: parsed[key] }), {})
  store.register(schema);
}

exports.scaffold = scaffold
exports.register = register
