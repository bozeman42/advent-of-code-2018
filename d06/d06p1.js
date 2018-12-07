const fs = require('fs')
const input = fs.readFileSync('./d06/input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item,index) => {
    const coords = item.split(', ')
    return {
      id: `${coords[0]}${coords[1]}`,
      x: coords[0],
      y: coords[1],
      territory: [
        {
          x: coords[0],
          y: coords[1]
        }
      ]
    }
  })

  function testPoint(point, input) {

  }

  function distance(p1, p2) {
    return (Math.abs(p1.x - p2.x) + Math.abs(p1.y - p1.y))
  }
