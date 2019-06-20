const { getDefaultValue } = require('./typer')
const { CLOSING_CURLY, DEFINE, OPENING_CURLY } = require('./constants')

/**
 * This is a function that parses the tokenized query string and returns a scaffolded object.
 * @param {string[]} tokenizedArr 
 * @param {Object} typeMap 
 */
const parse = (tokenizedArr, typeMap = {}, globalMap = {}) => {
  let obj = {}
  let lastElem = null
  for (let i = 0; i < tokenizedArr.length; ++i) {
    const elem = tokenizedArr[i]
    switch (elem) {
      case DEFINE: {
        typeMap[tokenizedArr[i + 1]] = tokenizedArr[i + 1]
        continue
      }
      case OPENING_CURLY: {
        const closingLastIndex = findClosingFlowerBracket(i, tokenizedArr)
        let object
        [object, typeMap] = parse(tokenizedArr.splice(i + 1, closingLastIndex - i), typeMap, globalMap)
        lastElem ? (!obj[lastElem]) ? (obj[lastElem] = object, globalMap[lastElem] = object) : null : obj = object
        break
      }
      case CLOSING_CURLY: {
        lastElem = null
        continue
      }
      default: {
        const [key, value] = getDefaultValue(elem, globalMap)
        obj[key] = value
        lastElem = key
      }
    }
  }
  return [obj, typeMap]
}

/**
 * This function finds the location of the closing flower bracket for an opened flower bracket.
 * @param {number} currentIndex 
 * @param {string[]} tokenizedArr 
 */
function findClosingFlowerBracket(currentIndex, tokenizedArr) {
  let value = 0
  for (let i = currentIndex + 1; i < tokenizedArr.length; ++i) {
    if (tokenizedArr[i] === OPENING_CURLY)++value
    if (tokenizedArr[i] === CLOSING_CURLY)--value
    if (value === -1) {
      return i
    }
  }
}

module.exports = {
  parse
}
