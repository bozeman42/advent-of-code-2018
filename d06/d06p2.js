const fs = require('fs')
const input = fs.readFileSync('./d06/input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(point => {
    return point.split(', ').map(coordinate => parseInt(coordinate))
  })

function distance(p1, p2) {
  const result = (Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]))
  return result
}

function totalDistance(p1) {
  return input.reduce((dist, p2) => {
    return dist + distance(p1, p2)
  }, 0)
}

let count = 0

for(let i = 0; i < 600; i++) {
  for(let j = 0; j < 600; j++) {
    if (totalDistance([i,j]) < 10000){
      count ++
    }
  }
}

console.log(count)