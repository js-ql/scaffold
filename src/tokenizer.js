const tokenize = (qlString) => {
  let key = ''
  let stack = []
  for (let i = 0; i < qlString.length; ++i) {
    const char = qlString[i]
    if (!(isBreakPoint(char) && qlString[i - 1] !== ':')) {
      key += char
    } else {
      if (key) stack = [...stack, key]
      key = ''
      if (char == '{' || char == '}') stack = [...stack, char]
    }
  }
  return stack
}

function isBreakPoint(char) {
  return ((((char === '{' || char === '}') || char === ' ') || char === '\n') || char === '')
}

exports.tokenize = tokenize