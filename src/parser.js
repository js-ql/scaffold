const { getDefaultValue } = require('./typer')

// This is a function that parses the tokenized query string and returns a scaffolded object.
const parse = (tokenizedArr) => {
  let obj = {}
  let lastElem = null
  for (let i = 0; i < tokenizedArr.length; ++i) {
    const elem = tokenizedArr[i]
    if (elem === '{') {
      const closingLastIndex = findClosingFlowerBracket(i, tokenizedArr)
      const object = parse(tokenizedArr.splice(i + 1, closingLastIndex - i))
      if (lastElem)
        obj[lastElem] = object
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
  return obj
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

exports.parse = parse