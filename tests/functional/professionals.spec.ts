import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { registerAndLogin } from '../helpers/auth_helper.js'

test.group('Professionals - Create', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should create a professional profile', async ({ client, assert }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Dr. João Silva',
      email: 'joao.professional@example.com',
      password: 'password123',
      userType: 'professional',
    })

    const response = await client
      .post('/api/professionals')
      .cookie('cuida_session', sessionCookie)
      .json({
        specialty: 'Enfermeiro',
        registrationNumber: 'COREN-123456',
        bio: 'Enfermeiro com 10 anos de experiência',
        hourlyRate: 50.0,
        experienceYears: 10,
        availableForEmergency: true,
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
      })

    response.assertStatus(201)
    assert.properties(response.body(), ['message', 'professional'])
    assert.equal(response.body().professional.specialty, 'Enfermeiro')
    assert.equal(response.body().professional.registrationNumber, 'COREN-123456')
    assert.equal(response.body().professional.hourlyRate, 50.0)
    assert.equal(response.body().professional.user.fullName, 'Dr. João Silva')
  })

  test('should create a professional profile with minimal data', async ({ client, assert }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Maria Santos',
      email: 'maria.professional@example.com',
      password: 'password123',
      userType: 'professional',
    })

    const response = await client
      .post('/api/professionals')
      .cookie('cuida_session', sessionCookie)
      .json({
        specialty: 'Cuidador',
      })

    response.assertStatus(201)
    assert.properties(response.body(), ['message', 'professional'])
    assert.equal(response.body().professional.specialty, 'Cuidador')
    assert.equal(response.body().professional.averageRating, 0)
    assert.equal(response.body().professional.totalReviews, 0)
  })

  test('should fail to create professional profile for patient user', async ({
    client,
  }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Patient User',
      email: 'patient@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const response = await client
      .post('/api/professionals')
      .cookie('cuida_session', sessionCookie)
      .json({
        specialty: 'Enfermeiro',
      })

    response.assertStatus(403)
  })

  test('should fail to create duplicate professional profile', async ({ client }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Duplicate Test',
      email: 'duplicate.professional@example.com',
      password: 'password123',
      userType: 'professional',
    })

    // First creation
    await client
      .post('/api/professionals')
      .cookie('cuida_session', sessionCookie)
      .json({
        specialty: 'Cuidador',
      })

    // Second creation attempt
    const response = await client
      .post('/api/professionals')
      .cookie('cuida_session', sessionCookie)
      .json({
        specialty: 'Enfermeiro',
      })

    response.assertStatus(409)
  })

  test('should fail without authentication', async ({ client }) => {
    const response = await client.post('/api/professionals').json({
      specialty: 'Cuidador',
    })

    response.assertStatus(401)
  })

  test('should fail with invalid data', async ({ client }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Test User',
      email: 'test.professional@example.com',
      password: 'password123',
      userType: 'professional',
    })

    const response = await client
      .post('/api/professionals')
      .cookie('cuida_session', sessionCookie)
      .json({
        specialty: 'AB', // Too short
      })

    response.assertStatus(422)
  })
})

test.group('Professionals - Show', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should get professional profile by id', async ({ client, assert }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Show Test',
      email: 'show.professional@example.com',
      password: 'password123',
      userType: 'professional',
    })

    const createResponse = await client
      .post('/api/professionals')
      .cookie('cuida_session', sessionCookie)
      .json({
        specialty: 'Fisioterapeuta',
        bio: 'Fisioterapeuta especializado',
      })

    const professionalId = createResponse.body().professional.id

    const response = await client.get(`/api/professionals/${professionalId}`)

    response.assertStatus(200)
    assert.properties(response.body(), ['professional'])
    assert.equal(response.body().professional.specialty, 'Fisioterapeuta')
    assert.equal(response.body().professional.user.fullName, 'Show Test')
  })

  test('should return 404 for non-existent professional', async ({ client }) => {
    const response = await client.get('/api/professionals/99999')

    response.assertStatus(404)
  })
})

test.group('Professionals - Update', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should update professional profile', async ({ client, assert }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Update Test',
      email: 'update.professional@example.com',
      password: 'password123',
      userType: 'professional',
    })

    const createResponse = await client
      .post('/api/professionals')
      .cookie('cuida_session', sessionCookie)
      .json({
        specialty: 'Cuidador',
        hourlyRate: 30.0,
      })

    const professionalId = createResponse.body().professional.id

    const response = await client
      .put(`/api/professionals/${professionalId}`)
      .cookie('cuida_session', sessionCookie)
      .json({
        specialty: 'Enfermeiro',
        hourlyRate: 60.0,
        bio: 'Enfermeiro atualizado',
      })

    response.assertStatus(200)
    assert.properties(response.body(), ['message', 'professional'])
    assert.equal(response.body().professional.specialty, 'Enfermeiro')
    assert.equal(response.body().professional.hourlyRate, 60.0)
    assert.equal(response.body().professional.bio, 'Enfermeiro atualizado')
  })

  test('should fail to update another user profile', async ({ client }) => {
    // Create first professional
    const { sessionCookie: sessionCookie1 } = await registerAndLogin(client, {
      fullName: 'Professional 1',
      email: 'professional1@example.com',
      password: 'password123',
      userType: 'professional',
    })

    const createResponse = await client
      .post('/api/professionals')
      .cookie('cuida_session', sessionCookie1)
      .json({
        specialty: 'Cuidador',
      })

    const professionalId = createResponse.body().professional.id

    // Create second professional
    const { sessionCookie: sessionCookie2 } = await registerAndLogin(client, {
      fullName: 'Professional 2',
      email: 'professional2@example.com',
      password: 'password123',
      userType: 'professional',
    })

    // Try to update first professional with second user session
    const response = await client
      .put(`/api/professionals/${professionalId}`)
      .cookie('cuida_session', sessionCookie2)
      .json({
        specialty: 'Enfermeiro',
      })

    response.assertStatus(403)
  })

  test('should fail without authentication', async ({ client }) => {
    const response = await client.put('/api/professionals/1').json({
      specialty: 'Enfermeiro',
    })

    response.assertStatus(401)
  })

  test('should return 404 for non-existent professional', async ({ client }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Test User',
      email: 'test.professional@example.com',
      password: 'password123',
      userType: 'professional',
    })

    const response = await client
      .put('/api/professionals/99999')
      .cookie('cuida_session', sessionCookie)
      .json({
        specialty: 'Enfermeiro',
      })

    response.assertStatus(404)
  })
})
