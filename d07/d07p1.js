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
  return [letter,
    instructions.filter(instruction => instruction[1] === letter).map(dep => dep[0])
  ]
})
const result = []

function readyInstructions() {
  return dependencies.filter(dep => dep[1].length === 0).map(inst => inst[0])
}

function executeInstruction(letter) {
  result.push(letter)
  dependencies = dependencies.filter(dep => dep[0] !== letter)
  dependencies.forEach(depList => depList[1] = depList[1].filter(depLetter => depLetter !== letter))
}
console.time('Instruction list')
while (dependencies.length > 0) {
  const ready = readyInstructions()
  executeInstruction(ready[0])
}
console.timeEnd('Instruction list')
console.log(result.join(''))