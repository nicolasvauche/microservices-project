require('dotenv').config({ path: './.env.test' })

module.exports = {
  testEnvironment: 'node',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/test/setup.js']
}
