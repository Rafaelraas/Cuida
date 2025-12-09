import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Professional from '#models/professional'
import Patient from '#models/patient'

export default class extends BaseSeeder {
  async run() {
    // Criar usuário profissional de exemplo
    const professionalUser = await User.create({
      fullName: 'Dr. João Silva',
      email: 'joao.silva@example.com',
      password: 'senha123',
      userType: 'professional',
      phoneNumber: '+5511999999999',
      isActive: true,
    })

    // Criar perfil profissional
    await Professional.create({
      userId: professionalUser.id,
      specialty: 'Fisioterapeuta',
      registrationNumber: 'CREFITO-12345',
      bio: 'Fisioterapeuta especializado em reabilitação motora com 10 anos de experiência. Atendimento domiciliar com foco em idosos e pacientes em recuperação pós-operatória.',
      hourlyRate: 80.0,
      experienceYears: 10,
      availableForEmergency: true,
      latitude: -23.5505,
      longitude: -46.6333,
      address: 'Rua Exemplo, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      averageRating: 4.8,
      totalReviews: 15,
    })

    // Criar outro profissional
    const professionalUser2 = await User.create({
      fullName: 'Enfermeira Maria Santos',
      email: 'maria.santos@example.com',
      password: 'senha123',
      userType: 'professional',
      phoneNumber: '+5511888888888',
      isActive: true,
    })

    await Professional.create({
      userId: professionalUser2.id,
      specialty: 'Enfermeira',
      registrationNumber: 'COREN-54321',
      bio: 'Enfermeira com experiência em cuidados intensivos e atendimento domiciliar. Especializada em cuidados geriátricos e administração de medicamentos.',
      hourlyRate: 70.0,
      experienceYears: 8,
      availableForEmergency: false,
      latitude: -23.5589,
      longitude: -46.6583,
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-200',
      averageRating: 4.9,
      totalReviews: 22,
    })

    // Criar usuário paciente de exemplo
    const patientUser = await User.create({
      fullName: 'Pedro Oliveira',
      email: 'pedro.oliveira@example.com',
      password: 'senha123',
      userType: 'patient',
      phoneNumber: '+5511777777777',
      isActive: true,
    })

    // Criar perfil de paciente
    await Patient.create({
      userId: patientUser.id,
      address: 'Rua das Flores, 456',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-300',
      latitude: -23.5489,
      longitude: -46.6388,
      emergencyContactName: 'Ana Oliveira',
      emergencyContactPhone: '+5511666666666',
      medicalConditions: 'Diabetes tipo 2, Hipertensão',
    })

    console.log('✅ Usuários de exemplo criados com sucesso!')
  }
}
