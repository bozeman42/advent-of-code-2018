import DataModel from '../DataModel.js'
import { deflateRaw } from 'zlib';
import { inherits } from 'util';

async function getData() {
  const response = await fetch('http://localhost:5000/input')
  .then(response => response.json())
  console.log(response)
  data = new DataModel(response)
  console.log(data.extremes())
}

getData()

const canvas = document.querySelector('#canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const ctx = canvas.getContext('2d')
const slider = document.querySelector('#time-slider')
let data





function draw(data) {
  
}

        slider.addEventListener('input',e => {
          const { value } = e.target
          if (data) {
            data.setTime(value)
            draw(data.currentState())
          }
        })