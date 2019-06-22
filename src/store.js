/**
 * The Store for the library, keeps track of schemas and generates scaffolded objects based on the schema name
 */
const Store = {

  registry: {}

}

const setSchema = function(schemas, store) {
  const schemaNames = Object.keys(schemas)
  for(let schemaName of schemaNames){
    if(!store.registry[schemaName]) store.registry[schemaName] = schemas[schemaName]
  }
}

const getSchema = function(schemaName, store) {
  return store.registry[schemaName]
}

module.exports = {
  Store, setSchema, getSchema
}
