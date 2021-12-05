const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

const PORT = 5000
const generations = require('./d12')

const data = generations
  .map(generation => {
    return Object.entries(generation)
      .reduce((result, [key, pot]) => {
        result[parseInt(key) + 3] = pot === '#'
        return result
      }, [false, false, false])
  })

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/data', (req,res) => {
  res.send(data)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
