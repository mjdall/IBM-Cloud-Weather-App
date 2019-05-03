const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api/apiv1.js')
const app = express()
const port = 5000 //  || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1/', api.router)

app.listen(port, () => console.log(`Listening on port ${port}`))
