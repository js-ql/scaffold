const { parse } = require('./src/parser')
const { tokenize } = require('./src/tokenizer')
const { isValidQl } = require('./src/validator')
const { Store } = require('./src/store')

const init = () => ({

  schemaPool: Store,

  scaffoldSchema: function (schemaName) {
    return this.schemaPool.getSchema(schemaName)
  },

  scaffold: function (qlString) {
    if (!isValidQl(qlString)) throw new Error('Invalid QL String')
    const [parsed] = parse(tokenize(qlString))
    return parsed
  },

  registerSchema: function (qlString) {
    if (!isValidQl(qlString)) throw new Error('Invalid QL String')
    const tokenizedArr = tokenize(qlString)
    const [parsed, typeMap] = parse(tokenizedArr)
    const schema = Object.keys(typeMap).reduce((a, key) => ({ ...a, [key]: parsed[key] }), {})
    this.schemaPool.register(schema)
  }

})


exports.init = init