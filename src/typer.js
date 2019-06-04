// This function will return the key and it's default value depending on the type
export function getDefaultValue(key) {
  const column = key.indexOf(":")
  if (column < 0) return [key, null]
  return [key.slice(0, column), defaultValueForType(key.slice(column + 1).trim())]
}


// This function will return the default value for the type provided for the property
function defaultValueForType(type) {
  switch (type) {
    case "String": return ""
    case "Array": return []
    case "Object": return {}
    default: return null
  }
}
