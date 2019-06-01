/**
 * Determines if the query string is valid
 * @param {string} qlString The Query String to check validity for
 * @returns {boolean} True or False, depending on the validity of the query string
 */
const isValidQl = (qlString) => {
  let k = 0
  for (let i = 0; i < qlString.length; i++) {
    if (qlString[i] === '{')
      k++
    else if (qlString[i] === '}')
      k--
    if (k === -1)
      return false
  }
  return k === 0
}

exports.isValidQl = isValidQl