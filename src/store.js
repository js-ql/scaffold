const Store = () => ({

  registry: {},

  register(schemas) {
    Object.keys(schemas).forEach(key => {
      if (!this.registry[key]) this.registry[key] = schemas[key]
    })
  },

  getSchema(schemaName) {
    return this.registry[schemaName]
  }
})


exports.Store = Store