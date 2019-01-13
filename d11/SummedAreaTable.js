class SummedAreaTable {
  constructor(grid) {
    const xLength = grid.length
    const yLength = grid[0].length
    this.table = []
    for (let x = 0; x < xLength; x += 1) {
      for (let y = 0; y < yLength; y += 1) {
        if (y === 0) {
          this.table[x] = [0]
        }
        this.table[x][y] = grid[x][y]
        if (x > 0) {
          this.table[x][y] += this.table[x - 1][y]
        }
        if (y > 0) {
          this.table[x][y] += this.table[x][y - 1]
        }
        if (x > 0 && y > 0) {
          this.table[x][y] -= this.table[x - 1][y - 1]
        }
      }
    }
  }

  squareValue(x, y, size) {
    const  [x1, y1] = [x + size - 1, y + size - 1]
    let sum = this.table[x1][y1]
    if (x > 0) {
      sum -= this.table[x - 1][y1]
    }
    if (y > 0) {
      sum -= this.table[x1][y - 1]
    }
    if (x > 0 && y > 0) {
      sum += this.table[x - 1][y - 1]
    }
    return sum
  }
}

module.exports = SummedAreaTable