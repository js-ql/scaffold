const { OPENING_CURLY, CLOSING_CURLY, NEWLINE, SPACE, EMPTY_STRING } = require('./constants')
/**
 * Determines if the query string is valid
 * @param {string} qlString The Query String to check validity for
 * @returns {boolean} True or False, depending on the validity of the query string
 */
const isValidQl = (qlString) => {
  if (!qlString || typeof qlString !== 'string') return false
  let k = 0
  let lastChar = null
  let curlyFlag = false
  for (let i = 0; i < qlString.length; i++) {
    const char = qlString[i]
    if (char === OPENING_CURLY || char === CLOSING_CURLY) {
      curlyFlag = true
      if (char === OPENING_CURLY) {
        if(lastChar === OPENING_CURLY) return false
        lastChar = OPENING_CURLY
        k++
      }
      else if (char === CLOSING_CURLY) {
        if (lastChar === OPENING_CURLY) {
          return false
        }
        k--
      }
    }
    else if (char !== NEWLINE && char !== SPACE) {
      lastChar = char
    }
    if (k === -1)
      return false
  }
  if(!curlyFlag) return false
  return k === 0
}

module.exports = {
  isValidQl
}
