/**
 * The Store for the library, keeps track of schemas and generates scaffolded objects based on the schema name
 */
export const Store = {

  registry: {},

  register: function(schemas) {
    const schemaNames = Object.keys(schemas)
    for(let schemaName of schemaNames){
      if(!this.registry[schemaName]) this.registry[schemaName] = schemas[schemaName]
    }
  },

  getSchema: function(schemaName) {
    return this.registry[schemaName]
  }
}