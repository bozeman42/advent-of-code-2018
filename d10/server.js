const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

const PORT = 5000

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .trim()
  .split('\n')

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/input', (req,res) => {

  res.send(input)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
