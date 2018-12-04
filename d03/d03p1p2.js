const fs = require('fs')
const fromFile = fs.readFileSync('./d03/input.txt')
const inputArr = fromFile.toString().split('\n').filter(item => item)
const fabricUsage = []
let sharedInches = 0
let unOverlappingClaims = []
console.time('d3 combined')
inputArr.forEach(claim => {
  const parts = claim.split(' ')
  const startCoords = parts[2].substr(0, parts[2].length - 1).split(',').map(str => parseInt(str))
  const dimensions = parts[3].split('x').map(str => parseInt(str))
  let claimOverlaps = false
  for (let i = startCoords[0]; i < startCoords[0] + dimensions[0]; i++) {
    fabricUsage[i] = fabricUsage[i] ? fabricUsage[i] : []
    for (let j = startCoords[1]; j < startCoords[1] + dimensions[1]; j++) {
      if (fabricUsage[i][j]) {
        unOverlappingClaims = unOverlappingClaims.filter(uC => {
          return !(fabricUsage[i][j].some(cl => cl === uC))
        })
        claimOverlaps = true
        if (fabricUsage[i][j].length === 1) {
          sharedInches++
        }
        fabricUsage[i][j].push(parts[0])
      } else {
        fabricUsage[i][j] = [parts[0]]
      }
    }
  }
  if (!claimOverlaps) {
    unOverlappingClaims.push(parts[0])
  }
})
console.timeEnd('d3 combined')

console.log('d3p1:', sharedInches)
console.log('unoverlapping claims', unOverlappingClaims)