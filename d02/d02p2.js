const input = require('./d02p1').input
let result = ''
console.time('d2p2 - oneLetterDifference')
input.some((code, codeIndex, arr) => {
  const codeArr = code.split('')
  for (let i = codeIndex + 1; i < arr.length; i++) {
    let otherCodeArr = arr[i].split('')
    const sharedLetters = codeArr.filter((letter,letterIndex) => {
      return otherCodeArr[letterIndex] === letter
    })
    if (sharedLetters.length === codeArr.length - 1) {
      result = sharedLetters.join('')
      break
    }
  }
  return result
})
console.timeEnd('d2p2 - oneLetterDifference')
console.log(result)