const request = require('supertest')
const app = require('../src/app')
const { sequelize } = require('../src/config/database')

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true }) // Réinitialise la base avant chaque test
  })

  afterAll(async () => {
    await sequelize.close() // Ferme la connexion après tous les tests
  })

  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    })

    expect(response.statusCode).toBe(201)
    expect(response.body.user).toHaveProperty('id')
    expect(response.body.user).toHaveProperty('email', 'testuser@example.com')
    expect(response.body.user).not.toHaveProperty('password')
  })

  it('should login the user and return a JWT token', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    })

    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})
