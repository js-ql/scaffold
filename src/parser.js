const parse = (tokenizedArr) => {
  let obj = {}
  let lastElem = null
  for (let i = 0; i < tokenizedArr.length; ++i) {
    const elem = tokenizedArr[i]
    if (elem === '{') {
      const closingLastIndex = findClosingParentheses(i, tokenizedArr)
      const object = parse(tokenizedArr.splice(i+1, closingLastIndex-i))
      if(lastElem)
        obj[lastElem] = object
      else obj = object
    }
    else if (elem === '}') {
      lastElem = null
      continue
    }
    else {
      obj[elem] = null
      lastElem = elem
    }
  }
  return obj
}


function findClosingParentheses(currentIndex, tokenizedArr){
  let value = 0
  for(let i = currentIndex+1; i < tokenizedArr.length; ++i){
    if(tokenizedArr[i]=='{') ++value
    if(tokenizedArr[i]=='}') --value
    if(value === -1) {
      return i
    }
  }
}

exports.parse = parse