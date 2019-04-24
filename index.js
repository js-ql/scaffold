const { parse } = require('./src/parser')
const { tokenize } = require('./src/tokenizer')
const { isValidQl } = require('./src/validator')

/**
 * 
 * @param {string} qlString - The schema string containing the blueprint of the object to be scaffolded
 * @description - This is a function that returns a promise containing an object blueprint corresponding to the schema passed as the argument
 * @returns - A promise that resolves to an object with non-object properties having a null value
 */
const scaffold = (qlString) => {
  return new Promise((resolve, reject) => {
    if (!isValidQl(qlString)) reject('Invalid QL String')
    resolve(parse(tokenize(qlString)))
  })
}

exports.Scaffold = scaffold
