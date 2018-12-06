const { input, reactAll, poly} = require('./d05p1')

function alphabet() {
  const arr = []
  for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    arr.push(String.fromCharCode(i))
  }
  return arr
}

function smallest(input) {
  const letters = alphabet()
  const result = letters.reduce((prev, letter) => {
    const regex = new RegExp(letter,'ig')
    const hi = 'hello'
    const reduced = input.replace(regex,'')
    const result = reactAll(reduced)
    return result.length < prev.size ? { size: result.length, letter: letter } : prev
  }, {size: input.length, letter: null } )
  return result
}

console.time('usePrev')
console.log(smallest(poly))
console.timeEnd('usePrev')
// console.time('freshInput')
// console.log(smallest(input))
// console.timeEnd('freshInput')