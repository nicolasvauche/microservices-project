const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')
const path = require('path')
const fs = require('fs')

dotenv.config()

const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    dialect: 'sqlite',
    storage: path.join(process.cwd(), process.env.DB_FILE || 'db/users.db'),
    logging: process.env.DB_LOGGING === 'true' ? console.log : false
  },
  test: {
    dialect: 'sqlite',
    storage: path.join(
      process.cwd(),
      process.env.TEST_DB_FILE || 'db/users_test.db'
    ),
    logging: false
  }
}

const currentConfig = config[env]

const dbPath = currentConfig.storage
const dbDirectory = path.dirname(dbPath)
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true })
}

const sequelize = new Sequelize(currentConfig)

const dbConnect = async () => {
  try {
    await sequelize.sync()
    console.log(`Database synchronized in ${env} mode`)
  } catch (error) {
    console.error('Database connection error:', error.message)
  }
}

module.exports = { sequelize, dbConnect }
