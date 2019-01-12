const fs = require('fs')
const input = fs.readFileSync('./d08/input.txt').toString().trim().split(' ').map(n => parseInt(n))

const metaDataList = []

let pos = 0

function readNode(array) {
  const nodes = array[pos]
  const currMetadata = []
  pos++
  const metaDataLength = array[pos]
  pos++
  const subNodes = []
  for ( let i = 0; i < nodes; i++ ) {
    subNodes.push(readNode(array))
  }
  const metaDataStart = pos
  for (; pos < metaDataStart + metaDataLength; pos++) {
    metaDataList.push(array[pos])
    currMetadata.push(array[pos])
  }
  let value = 0
  if (nodes) {
    currMetadata.forEach(metaVal => {
      value += subNodes[metaVal - 1] ? subNodes[metaVal - 1] : 0
    })
  } else {
    value = currMetadata.reduce((a, b) => a + b, 0)
  }
  return value
}
const result2 = readNode(input)
const result1 = metaDataList.reduce((a,b) => a + b)
console.log(result1, result2)