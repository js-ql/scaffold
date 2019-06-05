/**
 * This is a function that is used to tokenize the query string
 * @param {string} qlString The query string to tokenize
 * 
 */
export const tokenize = (qlString) => {
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


/**
 * This function returns true if the character being parsed is a breakpoint character
 * @param {string} char 
 */
function isBreakPoint(char) {
  return ((((char === '{' || char === '}') || char === ' ') || char === '\n') || char === '')
}
