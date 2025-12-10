import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { registerAndLogin } from '../helpers/auth_helper.js'

test.group('Patients - Create', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should create a patient profile', async ({ client, assert }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'João Silva',
      email: 'joao.patient@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const response = await client
      .post('/api/patients')
      .cookie('cuida_session', sessionCookie)
      .json({
        dateOfBirth: '1950-05-15',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        emergencyContactName: 'Maria Silva',
        emergencyContactPhone: '(11) 98765-4321',
        medicalConditions: 'Diabetes, Hipertensão',
      })

    response.assertStatus(201)
    assert.properties(response.body(), ['message', 'patient'])
    assert.equal(response.body().patient.emergencyContactName, 'Maria Silva')
    assert.equal(response.body().patient.city, 'São Paulo')
    assert.equal(response.body().patient.user.fullName, 'João Silva')
  })

  test('should create a patient profile with minimal data', async ({ client, assert }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Maria Santos',
      email: 'maria.patient@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const response = await client
      .post('/api/patients')
      .cookie('cuida_session', sessionCookie)
      .json({})

    response.assertStatus(201)
    assert.properties(response.body(), ['message', 'patient'])
    assert.equal(response.body().patient.user.fullName, 'Maria Santos')
  })

  test('should fail to create patient profile for professional user', async ({ client }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Professional User',
      email: 'professional@example.com',
      password: 'password123',
      userType: 'professional',
    })

    const response = await client
      .post('/api/patients')
      .cookie('cuida_session', sessionCookie)
      .json({
        emergencyContactName: 'Test Contact',
      })

    response.assertStatus(403)
  })

  test('should fail to create duplicate patient profile', async ({ client }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Duplicate Test',
      email: 'duplicate.patient@example.com',
      password: 'password123',
      userType: 'patient',
    })

    // First creation
    await client.post('/api/patients').cookie('cuida_session', sessionCookie).json({})

    // Second creation attempt
    const response = await client.post('/api/patients').cookie('cuida_session', sessionCookie).json({})

    response.assertStatus(409)
  })

  test('should fail without authentication', async ({ client }) => {
    const response = await client.post('/api/patients').json({})

    response.assertStatus(401)
  })
})

test.group('Patients - Show', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should get own patient profile', async ({ client, assert }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Show Test',
      email: 'show.patient@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const createResponse = await client
      .post('/api/patients')
      .cookie('cuida_session', sessionCookie)
      .json({
        emergencyContactName: 'Emergency Contact',
        medicalConditions: 'None',
      })

    const patientId = createResponse.body().patient.id

    const response = await client.get(`/api/patients/${patientId}`).cookie('cuida_session', sessionCookie)

    response.assertStatus(200)
    assert.properties(response.body(), ['patient'])
    assert.equal(response.body().patient.emergencyContactName, 'Emergency Contact')
    assert.equal(response.body().patient.user.fullName, 'Show Test')
  })

  test('should allow professional to view patient profile', async ({ client, assert }) => {
    // Create patient
    const { sessionCookie: patientCookie } = await registerAndLogin(client, {
      fullName: 'Patient User',
      email: 'patient@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const createResponse = await client
      .post('/api/patients')
      .cookie('cuida_session', patientCookie)
      .json({
        emergencyContactName: 'Emergency Contact',
      })

    const patientId = createResponse.body().patient.id

    // Create professional
    const { sessionCookie: professionalCookie } = await registerAndLogin(client, {
      fullName: 'Professional User',
      email: 'professional@example.com',
      password: 'password123',
      userType: 'professional',
    })

    // Professional views patient profile
    const response = await client.get(`/api/patients/${patientId}`).cookie('cuida_session', professionalCookie)

    response.assertStatus(200)
    assert.properties(response.body(), ['patient'])
  })

  test('should not allow other patient to view patient profile', async ({ client }) => {
    // Create first patient
    const { sessionCookie: patient1Cookie } = await registerAndLogin(client, {
      fullName: 'Patient 1',
      email: 'patient1@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const createResponse = await client
      .post('/api/patients')
      .cookie('cuida_session', patient1Cookie)
      .json({})

    const patientId = createResponse.body().patient.id

    // Create second patient
    const { sessionCookie: patient2Cookie } = await registerAndLogin(client, {
      fullName: 'Patient 2',
      email: 'patient2@example.com',
      password: 'password123',
      userType: 'patient',
    })

    // Second patient tries to view first patient profile
    const response = await client.get(`/api/patients/${patientId}`).cookie('cuida_session', patient2Cookie)

    response.assertStatus(403)
  })

  test('should fail without authentication', async ({ client }) => {
    const response = await client.get('/api/patients/1')

    response.assertStatus(401)
  })

  test('should return 404 for non-existent patient', async ({ client }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Test User',
      email: 'test.patient@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const response = await client.get('/api/patients/99999').cookie('cuida_session', sessionCookie)

    response.assertStatus(404)
  })
})

test.group('Patients - Update', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should update patient profile', async ({ client, assert }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Update Test',
      email: 'update.patient@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const createResponse = await client
      .post('/api/patients')
      .cookie('cuida_session', sessionCookie)
      .json({
        emergencyContactName: 'Old Contact',
        city: 'Rio de Janeiro',
      })

    const patientId = createResponse.body().patient.id

    const response = await client
      .put(`/api/patients/${patientId}`)
      .cookie('cuida_session', sessionCookie)
      .json({
        emergencyContactName: 'New Contact',
        city: 'São Paulo',
        medicalConditions: 'Updated conditions',
      })

    response.assertStatus(200)
    assert.properties(response.body(), ['message', 'patient'])
    assert.equal(response.body().patient.emergencyContactName, 'New Contact')
    assert.equal(response.body().patient.city, 'São Paulo')
    assert.equal(response.body().patient.medicalConditions, 'Updated conditions')
  })

  test('should fail to update another user profile', async ({ client }) => {
    // Create first patient
    const { sessionCookie: sessionCookie1 } = await registerAndLogin(client, {
      fullName: 'Patient 1',
      email: 'patient1@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const createResponse = await client
      .post('/api/patients')
      .cookie('cuida_session', sessionCookie1)
      .json({})

    const patientId = createResponse.body().patient.id

    // Create second patient
    const { sessionCookie: sessionCookie2 } = await registerAndLogin(client, {
      fullName: 'Patient 2',
      email: 'patient2@example.com',
      password: 'password123',
      userType: 'patient',
    })

    // Try to update first patient with second user session
    const response = await client
      .put(`/api/patients/${patientId}`)
      .cookie('cuida_session', sessionCookie2)
      .json({
        emergencyContactName: 'Unauthorized Update',
      })

    response.assertStatus(403)
  })

  test('should fail without authentication', async ({ client }) => {
    const response = await client.put('/api/patients/1').json({
      emergencyContactName: 'Test',
    })

    response.assertStatus(401)
  })

  test('should return 404 for non-existent patient', async ({ client }) => {
    const { sessionCookie } = await registerAndLogin(client, {
      fullName: 'Test User',
      email: 'test.patient@example.com',
      password: 'password123',
      userType: 'patient',
    })

    const response = await client
      .put('/api/patients/99999')
      .cookie('cuida_session', sessionCookie)
      .json({
        emergencyContactName: 'Test',
      })

    response.assertStatus(404)
  })
})
