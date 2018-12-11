const input = `249, 60
150, 332
174, 83
287, 329
102, 338
111, 201
259, 96
277, 161
143, 288
202, 311
335, 55
239, 148
137, 224
48, 214
186, 87
282, 334
147, 157
246, 191
241, 181
286, 129
270, 287
79, 119
189, 263
324, 280
316, 279
221, 236
327, 174
141, 82
238, 317
64, 264
226, 151
110, 110
336, 194
235, 333
237, 55
230, 137
267, 44
258, 134
223, 42
202, 76
159, 135
229, 238
197, 83
173, 286
123, 90
314, 165
140, 338
347, 60
108, 76
268, 329`
  .split('\n')
  .map((item) => {
    const coords = item.split(', ')
    return {
      id: `${coords[0]},${coords[1]}`,
      x: parseInt(coords[0]),
      y: parseInt(coords[1]),
      closestSeed: `${coords[0]},${coords[1]}`,
      color: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},1)`,
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
let count = 0
let maxDepth = 0
function testPoint(point, input, seed, prevPoint = point) {
  count++
  maxDepth = Math.max(count,maxDepth)
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
  if (point.closestSeed !== 'tie'){
    const seedCoords = seed.split(',').map(coord => parseInt(coord))
    point.color = grid[seedCoords[0]][seedCoords[1]].color
  } else {
    point.color = 'black'
  }
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
  return 1 + testPoint(grid[x][y-1],input,seed,point) + testPoint(grid[x][y+1],input,seed,point) + testPoint(grid[x-1][y],input,seed,point) + testPoint(grid[x+1][y],input,seed,point)
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
console.time('d6 recursion')
const result = input.reduce((prev,point) => {
  return Math.max(prev,testPoint(point, input,point.id))
},0)
console.timeEnd('d6 recursion')
console.log(maxDepth)
console.log(result)

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// canvas.height = window.innerHeight - 50
// canvas.width = window.innerWidth - 50
canvas.height = 800
canvas.width = 800

const inputMaxXY = input.reduce((prev,point) => {
  return {x: Math.max(point.x,prev.x),y: Math.max(point.y,prev.y)}
},{x:0,y:0})
const PIXEL_WIDTH = canvas.width / inputMaxXY.x
const PIXEL_HEIGHT = canvas.height / inputMaxXY.y

const scale = (point) => {
  const maxX = inputMaxXY.x
  const maxY = inputMaxXY.y
  return {x: (point.x / maxX) * canvas.width, y: (point.y / maxY) * canvas.width}
}
grid.forEach(row => {
  row.forEach(point => {
    const { x , y } = scale(point)
    ctx.fillStyle = point.color
    ctx.fillRect(x,y,PIXEL_WIDTH,PIXEL_HEIGHT)
  })
})
input.forEach(item => {
  const { x, y } = scale(item)
  ctx.moveTo(x,y)
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(x,y,5,0,Math.PI * 2)
  ctx.stroke()
  ctx.fill()
  ctx.closePath()
})