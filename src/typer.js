/**
 * This function will return the key and it's default value depending on the type
 * @param {string} key 
 */
export function getDefaultValue(key, types = null) {
  const column = key.indexOf(":")
  if (column < 0) return [key, null]
  return [key.slice(0, column), defaultValueForType(key.slice(column + 1).trim(), types)]
}

/**
 * This function will return the default value for the type provided for the property
 * @param {string} type 
 */
function defaultValueForType(type, types = null) {
  if (types && types[type]) return types[type]
  switch (type) {
    case "String": return ""
    case "Array": return []
    case "Object": return {}
    default: return null
  }
}
