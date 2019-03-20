const {isValidQl} = require('./validator')

const tokenize = (qlString) => {
  if(!isValidQl(qlString)) throw new Error('Invalid QL string')
  let key = ''
  let stack = []
  for (let i = 0; i < qlString.length; ++i) {
    const char = qlString[i]
    if(!isBreakPoint(char)){
      key+=char
    } else {
      if(key) stack = [...stack, key]
      key = ''
      if(char == '{' || char == '}') stack = [...stack, char]
    }
  }
  return stack;
}

function isBreakPoint (char) {
  return ((((char === '{' || char === '}') || char === ' ') || char === '\n') || char === '')
}


console.log(tokenize(`{container{ name{
  girlfriend
  baby
} }
                  }`))