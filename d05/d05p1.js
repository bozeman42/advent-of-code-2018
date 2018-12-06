const input = require('fs').readFileSync('./d05/input.txt').toString().trim()
const DIFF = charCodeDiff('a','A')

function reactAll(input) {
  let inputArr = input.split('')
  let index = 0
  let reactions = 0
  while (index < inputArr.length - 2) {
    let reacted = false
    while (index < inputArr.length - 2 && react(index, inputArr)) {
      let reactants = inputArr.splice(index, 2)
      reacted = true
    }
    index = reacted ? 0 : index + 1
  }
  return inputArr.join('')
}

console.log('d5p1 called')
function react(index, arr) {
  return charCodeDiff(arr[index], arr[index + 1]) === DIFF
}

function charCodeDiff (char1, char2) {
  return Math.abs(char1.charCodeAt(0) - char2.charCodeAt(0))
}
console.time('p1')
const result = reactAll(input)
console.timeEnd('p1')
console.log('length', result.length)

module.exports= {
  input,
  reactAll,
  poly: result
}