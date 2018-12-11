const fs = require('fs')
const input = fs.readFileSync('./d06/input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => {
    const coords = item.split(', ')
    return {
      id: `${coords[0]},${coords[1]}`,
      x: parseInt(coords[0]),
      y: parseInt(coords[1]),
      closestSeed: `${coords[0]},${coords[1]}`,
      distances: null,
      testedFrom: `${coords[0]},${coords[1]}`
    }
  })

const infinites = []
const grid = []

input.forEach(seed => {
  if (!grid[seed.x]) {
    grid[seed.x] = []
  }
  grid[seed.x][seed.y] = seed
})

function testPoint(point, input, seed, prevPoint = point) {
  if (point.distances && point.testedFrom === seed) {
    return 0
  }
  if (!point.distances){
    point.distances = distances(point,input)
  }
  point.testedFrom = seed
  const min = Math.min(...point.distances)
  const minIndex = point.distances.indexOf(min)
  point.closestSeed = minIndex === point.distances.lastIndexOf(min) ? input[minIndex].id : 'tie'
  if (infinites.indexOf(seed) > -1) {
    return 0
  }
  if (point.closestSeed === 'tie') {
    return 0
  }
  if (!point.distances.some((distance, index) => {
      return distance <= prevPoint.distances[index]
    }) ){
    infinites.push(seed)
    return 0
  }
  if (point.closestSeed !== prevPoint.closestSeed) {
    return 0
  }
  const { x, y } = point
  return testPoints(x,y,input,seed,point)
}

function testPoints(x,y,input,seed,point){
  populatePoints(x,y)
  return 1 + testPoint(grid[x][y+1],input,seed,point) + testPoint(grid[x][y-1],input,seed,point) + testPoint(grid[x-1][y],input,seed,point) + testPoint(grid[x+1][y],input,seed,point)
}

function populatePoints(x,y){
  if (!grid[x+1]) {
    grid[x+1] = []
  }
  if (!grid[x+1][y]) {
    grid[x+1][y] = {x: x+1, y}
  }
  if (!grid[x-1]) {
    grid[x-1] = []
  }
  if (!grid[x-1][y]) {
    grid[x-1][y] = {x: x-1, y}
  }
  if (!grid[x][y+1]) {
    grid[x][y+1] = {x, y: y+1 }
  }
  if (!grid[x][y-1]) {
    grid[x][y-1] = {x, y: y-1 }
  }
}

function distance(p1, p2) {
  const result = (Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y))
  return result
}

function distances (point,seeds) {
  const result = seeds.map(seed => distance(seed,point))
  return result
}

const result = input.reduce((prev,point) => {
  return Math.max(prev,testPoint(point, input,point.id))
},0)
console.log(infinites)
console.log(result)