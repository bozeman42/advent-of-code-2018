const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString()

class Pots {
  constructor(input) {
    const [
      initialStateString,
      ...allRulesString
    ] = input.split('\n\n')

    this.state = this.generateInitialState(initialStateString.split(': ')[1])
    this.nextState = {}
    this.rules = this.generateRules(allRulesString[0])
    this.generation = 0
    this.generations = [
      { ...this.state }
    ]
    this.prevGenerationScore = 0
    this.generationScoreDifference = 0
  }

  generateInitialState(string) {
    return string
      .split('')
      .reduce((state, plant, index) => {
        return {
          ...state,
          [index]: plant
        }
      }, {})
  }

  generateRules(string) {
    return string
      .split('\n')
      .map(ruleString => {
        return ruleString.split(' => ')
      })
      .map(rule => ({
        pattern: rule[0],
        result: rule[1]
      }))
      .reduce((ruleSet, rule) => {
        return {
          ...ruleSet,
          [rule.pattern]: rule.result
        }
      }, {})
  }

  getPattern(index) {
    const pots = [
      this.state[index - 2] ? this.state[index - 2] : '.',
      this.state[index - 1] ? this.state[index - 1] : '.',
      this.state[index] ? this.state[index] : '.',
      this.state[index + 1] ? this.state[index + 1] : '.',
      this.state[index + 2] ? this.state[index + 2] : '.'
    ]
    return pots.join('')
  }

  testPot(index) {
    return this.rules[this.getPattern(index)]
  }

  stopTesting(index) {
    return (!this.state[index] && this.getPattern(index) === '.....')
  }

  leftEdge() {
    let leftEdge = 0
    while(!this.stopTesting(leftEdge - 1)) {
      leftEdge--
    }
    return leftEdge
  }

  rightEdge() {
    let rightEdge = 99
    while(!this.stopTesting(rightEdge + 1)) {
      rightEdge++
    }
    return rightEdge
  }

  lowestPot() {
    return Object.keys(this.state)
      .map(x => parseInt(x))
      .reduce((min, pot) => pot < min ? pot : min)
  }

  highestPot() {
    return Object.keys(this.state)
      .map(x => parseInt(x))
      .reduce((max, pot) => pot > max ? pot : max)
  }

  // get generation() {
  //   return this.generations.length - 1
  // }

  get stateString() {
    let result = ''
    const start = this.lowestPot()
    const end = this.highestPot()
    for(let i = start; i <= end; i++) {
      result += this.state[i]
    }
    return result
  }

  testLeft() {
    for (let i = 0; !this.stopTesting(i); i--) {
      this.nextState[i] = this.testPot(i)
    }
  }

  testRight() {
    for (let i = 0; !this.stopTesting(i); i++) {
      this.nextState[i] = this.testPot(i)
    }
  }

  iterateGeneration() {
    this.prevGenerationScore = this.getStateScore()
    // const startingIndex = this.leftEdge()
    // const endingIndex = this.rightEdge()
    this.testLeft(),
    this.testRight()
    this.generations.push(this.nextState)
    this.state = this.nextState
    this.generationScoreDifference = this.getStateScore() - this.prevGenerationScore
    this.nextState = {}
    this.generation++
  }

  getStateScore() {
    return Object.entries(this.state)
      .map(entry => [parseInt(entry[0]), entry[1]])
      .reduce((total, [potValue, potContents]) => {
        return total += potContents === '#' ? potValue : 0
      }, 0)
  }

  padStateString(low, high) {

  }

  printGenerations() {
    const lowestPot = this.lowestPot()
    const highestPot = this.highestPot()

    let generation = 0


  }
}

const pots = new Pots(input)
let timeCounter = 0
console.log(pots.stateString, 'Generation #0')
while (pots.generation < 200) {
  console.table({
    generation: pots.generation,
    score: pots.getStateScore(),
    length: pots.stateString.length,
    differenceFromPrevScore: pots.generationScoreDifference
  })
  pots.iterateGeneration()
}

module.exports = pots.generations
