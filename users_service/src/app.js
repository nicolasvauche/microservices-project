const express = require('express')
const bodyParser = require('body-parser')
const { dbConnect } = require('./config/database')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

const app = express()

app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

dbConnect()

module.exports = app
