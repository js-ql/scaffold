// This function will return the key and it's default value depending on the type
function getDefaultValue(key) {
  const column = key.indexOf(":")
  if (column < 0) return [key, null]
  return [key.slice(0, column), defaultValueForType(key.slice(column + 1))]
}

function defaultValueForType(type) {
  switch (type) {
    case "String": return ""
    case "Array": return []
    case "Object": return {}
    default: return null
  }
}

exports.getDefaultValue = getDefaultValue