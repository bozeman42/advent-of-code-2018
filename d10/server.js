const express = require('express')
const fs = require('fs')
const app = express()

const PORT = 5000

const input = fs.readFileSync('./d10/input.txt')
  .toString()
  .trim()
  .split('\n')

app.use(express.static('d10/public'))

app.get('/input', (req,res) => {

  res.send(input)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
