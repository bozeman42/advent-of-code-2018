const fs = require('fs')

const input = fs.readFileSync('./d09/input.txt').toString().trim().split(' ')
let [ players, lastMarble ] = [ parseInt(input[0]), parseInt(input[6]) ]

const scores = [...(new Array(players))].map(item => 0)
const timesScored = [...(new Array(players))].map(item => 0)


let currentMarble = 0
let currentScore = 0
let currentPlayer = 0
let marbles = [0]
let pos = 0

let scoringRounds = []
players = 10
lastMarble = 2000

while ( currentMarble <= lastMarble) {
  currentScore = 0
  currentPlayer = currentPlayer < players - 1 ? currentPlayer + 1 : 0
  currentMarble++
  if ( currentMarble % 23 ) {
    pos = pos === marbles.length - 1 ? 1 : pos + 2
    marbles.splice(pos, 0, currentMarble)
  } else {
    currentScore += currentMarble
    pos = pos < 7 ? marbles.length - (7 - pos) : pos - 7
    const removed = marbles.splice(pos,1)[0]
    currentScore += removed
    timesScored[currentPlayer]++
    scores[currentPlayer] += currentScore
    scoringRounds.push({ marble: currentMarble, pos, removed, score: currentScore, scored: currentPlayer, playerTotal: scores[currentPlayer], timesScored: timesScored[currentPlayer] })
  }
}

console.log(scoringRounds)

console.log(scores.reduce((max, curr) => {
  return max > curr ? max : curr
}))
