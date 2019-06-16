const { OPENING_CURLY, CLOSING_CURLY } = require('./constants')
/**
 * Determines if the query string is valid
 * @param {string} qlString The Query String to check validity for
 * @returns {boolean} True or False, depending on the validity of the query string
 */
export const isValidQl = (qlString) => {
  let k = 0
  for (let i = 0; i < qlString.length; i++) {
    if (qlString[i] === OPENING_CURLY)
      k++
    else if (qlString[i] === CLOSING_CURLY)
      k--
    if (k === -1)
      return false
  }
  return k === 0
}
