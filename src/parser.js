const { getDefaultValue } = require('./typer')


// This is a function that parses the tokenized query string and returns a scaffolded object.
export const parse = (tokenizedArr, typeMap = {}) => {
  let obj = {}
  let lastElem = null
  for (let i = 0; i < tokenizedArr.length; ++i) {
    const elem = tokenizedArr[i]
    if (elem === 'define') {
      typeMap[tokenizedArr[i + 1]] = tokenizedArr[i + 1]
      continue
    }
    else if (elem === '{') {
      const closingLastIndex = findClosingFlowerBracket(i, tokenizedArr)
      let object
      [object, typeMap] = parse(tokenizedArr.splice(i + 1, closingLastIndex - i), typeMap)
      if (lastElem) {
        if (!obj[lastElem])
          obj[lastElem] = object
      }
      else obj = object
    }
    else if (elem === '}') {
      lastElem = null
      continue
    }
    else {
      const [key, value] = getDefaultValue(elem)
      obj[key] = value
      lastElem = key
    }
  }
  return [obj, typeMap]
}

// This function finds the location of the closing flower bracket for an opened flower bracket.
function findClosingFlowerBracket(currentIndex, tokenizedArr) {
  let value = 0
  for (let i = currentIndex + 1; i < tokenizedArr.length; ++i) {
    if (tokenizedArr[i] == '{')++value
    if (tokenizedArr[i] == '}')--value
    if (value === -1) {
      return i
    }
  }
}