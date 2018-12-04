const arr = require('./d01p1').arr
const map = {}

let frequency = 0
let index = 0
const length = arr.length
let count = 0
console.time('d1p2 - firstDuplicateSum')
while (!map[frequency]) {
  count++
  map[frequency] = true
  frequency += arr[index]
  index = index < length - 1 ? index + 1 : 0
}
console.timeEnd('d1p2 - firstDuplicateSum')

console.log(`Day 1 puzzle 2: ${frequency}`)
