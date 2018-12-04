const fs = require('fs')

const fromFile = fs.readFileSync('./d01/input.txt')
const arr = fromFile.toString().split('\n').filter(item => item).map(num => parseInt(num))
console.time('d1p1 - sum')
const result = arr.reduce((a,b) => a + b)
console.timeEnd('d1p1 - sum')

console.log(`Day 1 puzzle 1: ${result}`)
module.exports = {
  result,
  arr
}