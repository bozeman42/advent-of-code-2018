const fs = require('fs')
const input = fs.readFileSync('./d04/input.txt').toString().split('\n').filter(item => item).sort()
processInput(input)

function processInput(input){
  input.toString()
    .split('\n')
    .filter(item => item)
    .sort()
  input = input.map(logEntry => {
    logEntry = logEntry.split('] ')
    logEntry[0] = logEntry[0].substring(6)
    const timestamp = logEntry[0].split(' ')
    return {
      date: timestamp[0],
      time: parseInt(timestamp[1].split(':')[1]),
      entry: logEntry[1]
    }
  })
  let shifts = []
  input.forEach(( log, index, logs ) => {
    if (log.entry[0] === 'G') {
      shifts = [
        ...shifts, 
        { 
          id: parseInt(log.entry.substring(7)),
          naps: new Array(60).fill(0)
        }
      ]
    } else if (log.entry === 'falls asleep') {
      for(let i = log.time; i < logs[index + 1].time; i++) {
        shifts[shifts.length - 1].naps[i]++
      }
    }
  })
  const guardNaps = shifts.reduce((prev, log) => {
    if (prev[log.id]) {
      const combinedNap = prev[log.id].map( (minute, index) => {
        return minute + log.naps[index]
      })
      Object.assign(prev,{
        [log.id]: combinedNap
      })
    } else {
      Object.assign(prev,{ [log.id]: log.naps })
    }
    return prev
  },{})
  const totalSleep = Object.keys(guardNaps).map(key => {
    return {
      id: key,
      sleepTotal: guardNaps[key].reduce((a, b) => a + b),
      mostFrequentlyAsleep: guardNaps[key].reduce((a,b,i) => a.max > b ? a : {max: b, index: i},{max: 0} ),
      naps: guardNaps[key]
    }
  })
  const result = totalSleep.reduce((prev, guard) => {
    return guard.sleepTotal > prev.maxSleep ? { maxSleep: guard.sleepTotal, id: guard.id, minute: guard.mostFrequentlyAsleep.index, checksum: guard.id * guard.mostFrequentlyAsleep.index, naps: guard.naps}: prev
  }, {maxSleep: 0})
  const secondResult = totalSleep.reduce((prev, guard) => {
    return guard.mostFrequentlyAsleep.max > prev.max ? { id: guard.id, max: guard.mostFrequentlyAsleep.max, checksum: guard.id * guard.mostFrequentlyAsleep.index} : prev
  }, {max: 0})
  console.log(result, secondResult)
}