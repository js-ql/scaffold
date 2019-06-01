const Store = {

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


exports.Store = Store