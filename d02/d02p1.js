const fs = require('fs')

const fromFile = fs.readFileSync('./d02/input.txt')
const arr = fromFile.toString().split('\n').filter(item => item)
console.time('d2p1 - checksum')
const counts = arr.reduce((countObj, code) => {
  const letterMap = {}
  code.split('').forEach(letter => {
    letterMap.hasOwnProperty(letter) ? letterMap[letter]++ : letterMap[letter] = 1
  })
  
  const result = Object.keys(letterMap).reduce((obj, letter) => {
    if (obj["2"] && obj["3"]) return obj
    if (letterMap[letter] === 2) {
      obj["2"] = true
    } else if (letterMap[letter] ===3) {
      obj["3"] = true
    }
    return obj
  }, {"2": false, "3": false})
  result["2"] && countObj["2"]++
  result["3"] && countObj["3"]++
  return countObj
}, {"2": 0, "3": 0})
checksum = counts["2"] * counts["3"]
console.timeEnd('d2p1 - checksum')

console.log('checksum', checksum)

module.exports.input = arr