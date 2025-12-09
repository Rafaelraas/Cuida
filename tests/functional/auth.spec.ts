import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Auth - Register', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should register a new patient user', async ({ client, assert }) => {
    const response = await client.post('/api/auth/register').json({
      fullName: 'João Silva',
      email: 'joao@example.com',
      password: 'password123',
      userType: 'patient',
      phoneNumber: '(11) 98765-4321',
    })

    response.assertStatus(201)
    assert.properties(response.body(), ['message', 'user'])
    assert.equal(response.body().user.email, 'joao@example.com')
    assert.equal(response.body().user.userType, 'patient')
    assert.notExists(response.body().user.password)
  })

  test('should register a new professional user', async ({ client, assert }) => {
    const response = await client.post('/api/auth/register').json({
      fullName: 'Maria Santos',
      email: 'maria@example.com',
      password: 'password123',
      userType: 'professional',
    })

    response.assertStatus(201)
    assert.properties(response.body(), ['message', 'user'])
    assert.equal(response.body().user.email, 'maria@example.com')
    assert.equal(response.body().user.userType, 'professional')
  })

  test('should fail with invalid email', async ({ client }) => {
    const response = await client.post('/api/auth/register').json({
      fullName: 'Test User',
      email: 'invalid-email',
      password: 'password123',
      userType: 'patient',
    })

    response.assertStatus(422)
  })

  test('should fail with short password', async ({ client }) => {
    const response = await client.post('/api/auth/register').json({
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'short',
      userType: 'patient',
    })

    response.assertStatus(422)
  })

  test('should fail with duplicate email', async ({ client }) => {
    // First registration
    await client.post('/api/auth/register').json({
      fullName: 'First User',
      email: 'duplicate@example.com',
      password: 'password123',
      userType: 'patient',
    })

    // Second registration with same email
    const response = await client.post('/api/auth/register').json({
      fullName: 'Second User',
      email: 'duplicate@example.com',
      password: 'password123',
      userType: 'patient',
    })

    response.assertStatus(409)
  })
})

test.group('Auth - Login', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should login with valid credentials', async ({ client, assert }) => {
    // Register a user first
    await client.post('/api/auth/register').json({
      fullName: 'Login Test',
      email: 'login@example.com',
      password: 'password123',
      userType: 'patient',
    })

    // Login
    const response = await client.post('/api/auth/login').json({
      email: 'login@example.com',
      password: 'password123',
    })

    response.assertStatus(200)
    assert.properties(response.body(), ['message', 'user'])
    assert.equal(response.body().user.email, 'login@example.com')
  })

  test('should fail with invalid credentials', async ({ client }) => {
    const response = await client.post('/api/auth/login').json({
      email: 'nonexistent@example.com',
      password: 'wrongpassword',
    })

    response.assertStatus(401)
  })

  test('should fail with invalid email format', async ({ client }) => {
    const response = await client.post('/api/auth/login').json({
      email: 'invalid-email',
      password: 'password123',
    })

    response.assertStatus(422)
  })
})

test.group('Auth - Me', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should return authenticated user', async ({ client, assert }) => {
    // Register and login
    await client.post('/api/auth/register').json({
      fullName: 'Me Test',
      email: 'me@example.com',
      password: 'password123',
      userType: 'professional',
    })

    const loginResponse = await client.post('/api/auth/login').json({
      email: 'me@example.com',
      password: 'password123',
    })

    // Get authenticated user info
    const response = await client.get('/api/auth/me').cookie(
      'cuida_session',
      loginResponse.header('set-cookie') || ''
    )

    response.assertStatus(200)
    assert.properties(response.body(), ['user'])
    assert.equal(response.body().user.email, 'me@example.com')
  })

  test('should fail without authentication', async ({ client }) => {
    const response = await client.get('/api/auth/me')

    response.assertStatus(401)
  })
})

test.group('Auth - Logout', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should logout successfully', async ({ client }) => {
    // Register and login
    await client.post('/api/auth/register').json({
      fullName: 'Logout Test',
      email: 'logout@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const loginResponse = await client.post('/api/auth/login').json({
      email: 'logout@example.com',
      password: 'password123',
    })

    // Logout
    const response = await client.post('/api/auth/logout').cookie(
      'cuida_session',
      loginResponse.header('set-cookie') || ''
    )

    response.assertStatus(200)
  })

  test('should fail without authentication', async ({ client }) => {
    const response = await client.post('/api/auth/logout')

    response.assertStatus(401)
  })
})
