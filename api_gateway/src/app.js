const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')
const verifyTokenPresence = require('./middlewares/auth_middleware')

const app = express()

app.use(
  cors({
    origin: '*'
  })
)

const services = {
  users: 'http://users-service:3000',
  auth: 'http://users-service:3000',
  tasks: 'http://tasks-service:8000',
  remindersgenerate: 'http://reminders-service:8000',
  reminderslist: 'http://reminders-service:8000'
}

app.use(verifyTokenPresence)

Object.entries(services).forEach(([route, target]) => {
  app.use(
    `/api/${route}`,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path, req) => {
        return req.originalUrl
      }
    })
  )
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
