const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const verifyTokenPresence = require('./middlewares/auth_middleware')

const app = express()

const services = {
  users: 'http://localhost:3000',
  auth: 'http://localhost:3000',
  tasks: 'http://localhost:8000',
  remindersgenerate: 'http://localhost:8001',
  reminderslist: 'http://localhost:8001'
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
