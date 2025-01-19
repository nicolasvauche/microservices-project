const request = require('supertest')
const app = require('../src/app')
const { sequelize } = require('../src/config/database')

describe('User Endpoints', () => {
  let token

  beforeAll(async () => {
    await sequelize.sync({ force: true }) // Réinitialise la base
    await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123'
    })

    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'user@example.com',
      password: 'password123'
    })

    token = loginResponse.body.token
  })

  afterAll(async () => {
    await sequelize.close() // Ferme la connexion
  })

  it("should fetch the logged-in user's details", async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('email', 'user@example.com')
    expect(response.body).not.toHaveProperty('password')
  })

  it("should update the user's details", async () => {
    const response = await request(app)
      .put('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Name',
        email: 'updated@example.com'
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.user).toHaveProperty('name', 'Updated Name')
    expect(response.body.user).toHaveProperty('email', 'updated@example.com')
  })

  it('should delete the user account', async () => {
    const response = await request(app)
      .delete('/api/users/me')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('message', 'User deleted successfully')
  })
})
