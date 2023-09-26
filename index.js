const express = require('express')
const app = express()

const path = require('path')
app.use(express.static(path.join(__dirname, 'views')))

const parseUrl = require('body-parser')
let encodeUrl = parseUrl.urlencoded({extended: true})

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'views', 'index.html')
  })

const validId = require('./decode')

app.post('/validate', encodeUrl, (req, res) => {
  console.log(req.body.id_code)
  res.send(validId.idDecoder(req.body.id_code))
})

app.listen(3000, () => {
  console.log(`Example app listening on port http://localhost:3000`)
})