/**
 * The Store for the library, keeps track of schemas and generates scaffolded objects based on the schema name
 */
const Store = {

  registry: {}

}

const isBrowser = new Function("try { return this===window }catch(e){ return false }")


/**
 * @type {Object} The list of schemas
 */
const getStore = function () {


  if (isBrowser()) {
    if (!localStorage.getItem('schemaKey')) {
      localStorage.setItem('schemaKey', Math.random().toString())
    }

    const storeKey = localStorage.getItem('schemaKey')

    if (!localStorage.getItem(storeKey)) {
      localStorage.setItem(storeKey, JSON.stringify(Store))
    }
    return JSON.parse(localStorage.getItem(storeKey))
  }

  else return Store

}


const setSchema = function (schemas, store) {
  const schemaNames = Object.keys(schemas)
  for (let schemaName of schemaNames) {
    store.registry[schemaName] = schemas[schemaName]
    if (isBrowser()) localStorage.setItem(localStorage.getItem('schemaKey'), JSON.stringify(store))
  }
}

const getSchema = function (schemaName, store) {
  return store.registry[schemaName]
}

module.exports = {
  setSchema, getSchema, getStore
}
