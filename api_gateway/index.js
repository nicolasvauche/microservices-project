const http = require('http')
const app = require('./src/app')

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const MAX_RETRIES = 10
let port = DEFAULT_PORT
let retries = 0
let server

const startServer = () => {
  server = http.createServer(app)

  server.listen(port, () => {
    console.log(`API REST running at http://localhost:${port}`)
  })

  server.on('error', error => {
    handleServerError(error)
  })
}

const handleServerError = error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      retries++
      if (retries > MAX_RETRIES) {
        console.error(
          `Port ${port} is already in use after ${MAX_RETRIES} retries. Exiting...`
        )
        process.exit(1)
      }
      console.warn(`${bind} is already in use. Trying port ${port + 1}...`)
      port++
      server.close(() => {
        startServer()
      })
      break
    default:
      throw error
  }
}

startServer()
