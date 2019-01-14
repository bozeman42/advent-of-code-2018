const SERIAL_NUMBER = 1718
const SummedAreaTable = require('./SummedAreaTable')

const GRID_SIZE = 300

let grid = []
function populateGrid() {
  for (let x = 0; x < GRID_SIZE; x += 1) {
    for (let y = 0; y < GRID_SIZE; y += 1) {
      if (y === 0) {
        grid[x] = []
      }
      const rackId = x + 1 + 10
      let powerLevel = rackId * (y + 1)
      powerLevel += SERIAL_NUMBER
      powerLevel *= rackId
      powerLevel = (Math.floor(powerLevel / 100) % 10) - 5
      grid[x][y] = powerLevel
    }
  }
}
console.time('GridPopulation')
populateGrid()
console.timeEnd('GridPopulation')
function bestSquare(grid) {
  let bestSquare = {
    value: -Infinity,
    x: -1,
    y: -1,
    size: 0
  }
  console.time('SummedAreaTable')
  let sat = new SummedAreaTable(grid)
  console.timeEnd('SummedAreaTable')
  for (let squareSize = 1; squareSize <= GRID_SIZE; squareSize += 1) {
    for (let x = 0; x < GRID_SIZE - squareSize; x += 1) {
      for (let y = 0; y < GRID_SIZE - squareSize; y += 1) {
        let value = sat.squareValue(x, y, squareSize)
        if (value > bestSquare.value) {
          bestSquare = {
            value,
            x: x + 1,
            y: y + 1,
            size: squareSize
          }
        }
      }
    }
  }
  return bestSquare
}



function findBestSquareBruteForce(grid) {
  let bestSquare = {
    value: -1000000,
    x: -1,
    y: -1,
    size: 0
  }
  for (let squareSize = 1; squareSize <= GRID_SIZE; squareSize += 1) {
    for (let x = 0; x < GRID_SIZE - squareSize; x += 1) {
      for (let y = 0; y < GRID_SIZE - squareSize; y += 1) {
        let squareTotal = 0
        for (let xp = 0; xp < squareSize; xp += 1) {
          for (let yp = 0; yp < squareSize; yp += 1) {
            squareTotal += grid[x + xp][y + yp]
          }
        }
        if (squareTotal > bestSquare.value) {
          bestSquare = {
            value: squareTotal,
            x: x + 1,
            y: y + 1,
            size: squareSize
          }
        }
      }
    }
  }
  return bestSquare
}

console.time('Solution')
console.log(bestSquare(grid))
console.timeEnd('Solution')

// console.time('brute force')
// console.log(findBestSquareBruteForce(grid))
// console.timeEnd('brute force')
