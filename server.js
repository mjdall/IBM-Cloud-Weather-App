const isProduction = process.env.NODE_ENV === 'production'
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api/apiv1.js')
const app = express()
const port = isProduction ? 8080 : 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1/', api.router)

if (isProduction) {
  const client = require('./client/server')
  app.use(client.server)
}

app.listen(port, () => console.log(`Listening on port ${port}`))
