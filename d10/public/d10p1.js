import DataModel from '../DataModel.js'

const CANVAS_HEIGHT = 70
const CANVAS_WIDTH = 500

async function getData() {
  const response = await fetch('http://localhost:5000/input')
    .then(response => response.json())
  console.log(response)
  data = new DataModel(response)
  console.log(data.extremes())
}

getData()

const timestamp = document.querySelector('#timestamp')
const canvas = document.querySelector('#canvas')
canvas.height = CANVAS_HEIGHT
canvas.width = CANVAS_WIDTH
const ctx = canvas.getContext('2d')
const slider = document.querySelector('#time-slider')
const min = document.querySelector('#min')
const max = document.querySelector('#max')

let data

function draw(data, ctx) {
  const cs = data.currentState()
  const [[xMin, xMax],[yMin,yMax]] = data.extremes()
  ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
  cs.forEach(point => {
    const [x,y] = point
    ctx.fillRect(scaleX(x,xMin,xMax),scaleY(y,yMin,yMax),5 ,5)
    ctx.stroke()
  })
}

min.addEventListener('input',e => {
  const { value } = e.target
  slider.setAttribute('min',value)
})
max.addEventListener('input',e => {
  const { value } = e.target
  slider.setAttribute('max',value)
})

slider.addEventListener('input', e => {
  const { value } = e.target
  if (data) {
    timestamp.textContent = value
    data.setTime(value)
    draw(data, ctx)
  }
})

function scaleX(value, valMin, valMax) {
  return mapToRange(value, valMin, valMax, 5, CANVAS_WIDTH -5 )
}
function scaleY(value, valMin, valMax) {
  return mapToRange(value, valMin, valMax, 5, CANVAS_HEIGHT -5 )
}
function mapToRange (value, valMin, valMax, outMin, outMax) {
  return (value - valMin) * (outMax - outMin) / (valMax - valMin)  + outMin
}

