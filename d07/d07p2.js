const fs = require('fs')
const input = fs.readFileSync('./d07/input.txt')
  .toString()
  .trim()
  .split('\n')

const instructions = input.map(line => {
  const parts = line.split(' ')
  return [parts[1], parts[7]]
})

const aCode = 65
const alphaArray = []
for (let i = aCode; i < aCode + 26; i++) {
  alphaArray.push(String.fromCharCode(i))
}

let dependencies = alphaArray.map(letter => {
  return [
    letter,
    instructions.filter(instruction => instruction[1] === letter).map(dep => dep[0])
  ]
})

const completed = []

let clock = -1
let WORKERS = 5
let workQueue = []

function cost(letter) {
  return letter.charCodeAt(0) - 4
}

function readyInstructions() {
  return dependencies.filter(dep => dep[1].length === 0).map(inst => inst[0])
}


function completionCheck() {
  workQueue.forEach(({letter, cost}) => {

    if(cost === 0) {
      completed.push(letter)
      dependencies.forEach(depList => depList[1] = depList[1].filter(depLetter => depLetter !== letter))
    }
  })
  workQueue = workQueue.filter(step => step.cost !== 0)
}

function doWork() {
  workQueue.forEach(step => {
    step.cost--
  })
}

function beginWork() {
  while (workQueue.length < WORKERS && readyInstructions().length) {
    beginInstruction(readyInstructions()[0])
  }
}

function beginInstruction(letter) {
  dependencies = dependencies.filter(dep => dep[0] !== letter)
  workQueue.push({letter, cost: cost(letter)})
}

while (completed.length < 26) {
  clock++
  completionCheck()
  beginWork()
  doWork()
}

console.log(clock)