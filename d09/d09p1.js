const LinkedList = require('./linked-list/LinkedList')


function game(players, maxValue) {
  const gameList = new LinkedList()
  let currentMarble = 0
  gameList.insert(currentMarble)
  gameList.read()
  const scores = new Array(players).fill(0)
  let currentPlayer = 0
  while (currentMarble <= maxValue) {
    currentMarble++
    if (currentMarble % 23 === 0) {
      scores[currentPlayer] += currentMarble
      gameList.prev(7)
      scores[currentPlayer] += gameList.read()
      gameList.delete()
    } else {
      gameList.next().insert(currentMarble)
    }
    currentPlayer = currentPlayer === scores.length - 1 ? 0 : currentPlayer + 1
  }

  return Math.max(...scores)
}

// 471 players; last marble is worth 72026 points
console.time('game1')
console.log(game(471, 72026))
console.timeEnd('game1')
console.time('game2')
console.log(game(471, 7202600))
console.timeEnd('game2')