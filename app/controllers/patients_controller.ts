import type { HttpContext } from '@adonisjs/core/http'
import Patient from '#models/patient'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

/**
 * Controller de Pacientes
 * 
 * Responsável por gerenciar perfis de pacientes
 */
export default class PatientsController {
  /**
   * Registrar novo paciente
   * 
   * @route POST /api/patients
   * @middleware auth
   */
  async store({ request, response, auth }: HttpContext) {
    // Validador de dados de paciente
    const patientSchema = vine.object({
      dateOfBirth: vine.date().optional(),
      address: vine.string().maxLength(255).optional(),
      city: vine.string().maxLength(100).optional(),
      state: vine.string().maxLength(2).optional(),
      zipCode: vine.string().maxLength(20).optional(),
      latitude: vine.number().optional(),
      longitude: vine.number().optional(),
      emergencyContactName: vine.string().maxLength(255).optional(),
      emergencyContactPhone: vine.string().maxLength(20).optional(),
      medicalConditions: vine.string().maxLength(2000).optional(),
    })

    try {
      const user = auth.use('web').user

      if (!user) {
        return response.unauthorized({
          error: {
            message: 'Não autenticado',
            code: 'NOT_AUTHENTICATED',
          },
        })
      }

      // Verificar se o usuário é do tipo paciente
      if (user.userType !== 'patient') {
        return response.forbidden({
          error: {
            message: 'Apenas usuários do tipo paciente podem criar perfis de paciente',
            code: 'INVALID_USER_TYPE',
          },
        })
      }

      // Verificar se já existe perfil de paciente para este usuário
      const existingPatient = await Patient.findBy('user_id', user.id)
      if (existingPatient) {
        return response.conflict({
          error: {
            message: 'Perfil de paciente já existe para este usuário',
            code: 'PROFILE_ALREADY_EXISTS',
          },
        })
      }

      // Validar dados
      const data = await vine.validate({
        schema: patientSchema,
        data: request.all(),
      })

      // Criar perfil de paciente
      const patient = await Patient.create({
        userId: user.id,
        ...data,
        dateOfBirth: data.dateOfBirth ? DateTime.fromJSDate(data.dateOfBirth) : null,
      })

      await patient.load('user')

      return response.created({
        message: 'Perfil de paciente criado com sucesso',
        patient: {
          id: patient.id,
          userId: patient.userId,
          dateOfBirth: patient.dateOfBirth,
          address: patient.address,
          city: patient.city,
          state: patient.state,
          zipCode: patient.zipCode,
          latitude: patient.latitude,
          longitude: patient.longitude,
          emergencyContactName: patient.emergencyContactName,
          emergencyContactPhone: patient.emergencyContactPhone,
          medicalConditions: patient.medicalConditions,
          createdAt: patient.createdAt,
          user: {
            id: patient.user.id,
            fullName: patient.user.fullName,
            email: patient.user.email,
            phoneNumber: patient.user.phoneNumber,
          },
        },
      })
    } catch (error) {
      if (error.messages) {
        return response.unprocessableEntity({
          error: {
            message: 'Erro de validação',
            code: 'VALIDATION_ERROR',
            details: error.messages,
          },
        })
      }

      return response.internalServerError({
        error: {
          message: 'Erro ao criar perfil de paciente',
          code: 'INTERNAL_ERROR',
        },
      })
    }
  }

  /**
   * Visualizar perfil de paciente
   * 
   * @route GET /api/patients/:id
   * @middleware auth
   */
  async show({ params, response, auth }: HttpContext) {
    try {
      const user = auth.use('web').user

      if (!user) {
        return response.unauthorized({
          error: {
            message: 'Não autenticado',
            code: 'NOT_AUTHENTICATED',
          },
        })
      }

      const patient = await Patient.query()
        .where('id', params.id)
        .preload('user')
        .firstOrFail()

      // Apenas o próprio paciente ou profissionais podem ver o perfil completo
      if (patient.userId !== user.id && user.userType !== 'professional') {
        return response.forbidden({
          error: {
            message: 'Você não tem permissão para visualizar este perfil',
            code: 'FORBIDDEN',
          },
        })
      }

      return response.ok({
        patient: {
          id: patient.id,
          userId: patient.userId,
          dateOfBirth: patient.dateOfBirth,
          address: patient.address,
          city: patient.city,
          state: patient.state,
          zipCode: patient.zipCode,
          latitude: patient.latitude,
          longitude: patient.longitude,
          emergencyContactName: patient.emergencyContactName,
          emergencyContactPhone: patient.emergencyContactPhone,
          medicalConditions: patient.medicalConditions,
          createdAt: patient.createdAt,
          updatedAt: patient.updatedAt,
          user: {
            id: patient.user.id,
            fullName: patient.user.fullName,
            email: patient.user.email,
            phoneNumber: patient.user.phoneNumber,
          },
        },
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          error: {
            message: 'Paciente não encontrado',
            code: 'PATIENT_NOT_FOUND',
          },
        })
      }

      return response.internalServerError({
        error: {
          message: 'Erro ao buscar perfil de paciente',
          code: 'INTERNAL_ERROR',
        },
      })
    }
  }

  /**
   * Atualizar perfil de paciente
   * 
   * @route PUT /api/patients/:id
   * @middleware auth
   */
  async update({ params, request, response, auth }: HttpContext) {
    // Validador de atualização de paciente
    const updateSchema = vine.object({
      dateOfBirth: vine.date().optional(),
      address: vine.string().maxLength(255).optional(),
      city: vine.string().maxLength(100).optional(),
      state: vine.string().maxLength(2).optional(),
      zipCode: vine.string().maxLength(20).optional(),
      latitude: vine.number().optional(),
      longitude: vine.number().optional(),
      emergencyContactName: vine.string().maxLength(255).optional(),
      emergencyContactPhone: vine.string().maxLength(20).optional(),
      medicalConditions: vine.string().maxLength(2000).optional(),
    })

    try {
      const user = auth.use('web').user

      if (!user) {
        return response.unauthorized({
          error: {
            message: 'Não autenticado',
            code: 'NOT_AUTHENTICATED',
          },
        })
      }

      const patient = await Patient.query()
        .where('id', params.id)
        .preload('user')
        .firstOrFail()

      // Verificar se o usuário autenticado é o dono do perfil
      if (patient.userId !== user.id) {
        return response.forbidden({
          error: {
            message: 'Você não tem permissão para atualizar este perfil',
            code: 'FORBIDDEN',
          },
        })
      }

      // Validar dados
      const data = await vine.validate({
        schema: updateSchema,
        data: request.all(),
      })

      // Atualizar perfil
      patient.merge({
        ...data,
        dateOfBirth: data.dateOfBirth ? DateTime.fromJSDate(data.dateOfBirth) : patient.dateOfBirth,
      })
      await patient.save()

      return response.ok({
        message: 'Perfil de paciente atualizado com sucesso',
        patient: {
          id: patient.id,
          userId: patient.userId,
          dateOfBirth: patient.dateOfBirth,
          address: patient.address,
          city: patient.city,
          state: patient.state,
          zipCode: patient.zipCode,
          latitude: patient.latitude,
          longitude: patient.longitude,
          emergencyContactName: patient.emergencyContactName,
          emergencyContactPhone: patient.emergencyContactPhone,
          medicalConditions: patient.medicalConditions,
          updatedAt: patient.updatedAt,
          user: {
            id: patient.user.id,
            fullName: patient.user.fullName,
            email: patient.user.email,
            phoneNumber: patient.user.phoneNumber,
          },
        },
      })
    } catch (error) {
      if (error.messages) {
        return response.unprocessableEntity({
          error: {
            message: 'Erro de validação',
            code: 'VALIDATION_ERROR',
            details: error.messages,
          },
        })
      }

      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          error: {
            message: 'Paciente não encontrado',
            code: 'PATIENT_NOT_FOUND',
          },
        })
      }

      return response.internalServerError({
        error: {
          message: 'Erro ao atualizar perfil de paciente',
          code: 'INTERNAL_ERROR',
        },
      })
    }
  }
}
