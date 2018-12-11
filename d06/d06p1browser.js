const input = `83, 153
201, 74
291, 245
269, 271
222, 337
291, 271
173, 346
189, 184
170, 240
127, 96
76, 46
92, 182
107, 160
311, 142
247, 321
303, 295
141, 310
147, 70
48, 41
40, 276
46, 313
175, 279
149, 177
181, 189
347, 163
215, 135
103, 159
222, 304
201, 184
272, 354
113, 74
59, 231
302, 251
127, 312
259, 259
41, 244
43, 238
193, 172
147, 353
332, 316
353, 218
100, 115
111, 58
210, 108
101, 175
185, 98
256, 311
142, 41
68, 228
327, 194`
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
console.time('d6 recursion')
const result = input.reduce((prev,point) => {
  return Math.max(prev,testPoint(point, input,point.id))
},0)
console.timeEnd('d6 recursion')
console.log(result)

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = window.innerHeight - 50
canvas.width = window.innerWidth - 50


const inputMaxXY = input.reduce((prev,point) => {
  return {x: Math.max(point.x,prev.x),y: Math.max(point.y,prev.y)}
},{x:0,y:0})
const PIXEL_WIDTH = canvas.width / inputMaxXY.x
const PIXEL_HEIGHT = canvas.height / inputMaxXY.y

const scale = (point) => {
  const maxX = inputMaxXY.x
  const maxY = inputMaxXY.y
  return {x: (point.x / maxX) * window.innerWidth, y: (point.y / maxY) * window.innerHeight}
}

grid.forEach(row => {
  row.forEach(point => {
    const { x , y } = scale(point)
    ctx.fillStyle = point.color
    ctx.fillRect(x,y,PIXEL_WIDTH,PIXEL_HEIGHT)
  })
})