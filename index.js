const {parse} = require('./src/parser')
const {tokenize} = require('./src/tokenizer')
const {isValidQl} = require('./src/validator')

const scaffold = (qlString) => {
  return new Promise((resolve, reject) => {
    if(!isValidQl(qlString)) reject('Invalid QL String')
    resolve(parse(tokenize(qlString)))
  })
}

exports.Scaffold = scaffold