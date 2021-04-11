require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const app = new express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/user', require('./routes/User.route'))
app.use('/property', require('./routes/Property.route'))
app.use('/message', require('./routes/Message.route'))

let port = process.env.PORT || 5000
app.listen(port);
console.log(`Server started at ${port}`);