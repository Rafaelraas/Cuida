import type { HttpContext } from '@adonisjs/core/http'
import Professional from '#models/professional'
import vine from '@vinejs/vine'

/**
 * Controller de Profissionais
 * 
 * Responsável por gerenciar perfis de profissionais
 */
export default class ProfessionalsController {
  /**
   * Registrar novo profissional
   * 
   * @route POST /api/professionals
   * @middleware auth
   */
  async store({ request, response, auth }: HttpContext) {
    // Validador de dados de profissional
    const professionalSchema = vine.object({
      specialty: vine.string().minLength(3).maxLength(100),
      registrationNumber: vine.string().maxLength(50).optional(),
      bio: vine.string().maxLength(1000).optional(),
      hourlyRate: vine.number().min(0).optional(),
      experienceYears: vine.number().min(0).optional(),
      availableForEmergency: vine.boolean().optional(),
      address: vine.string().maxLength(255).optional(),
      city: vine.string().maxLength(100).optional(),
      state: vine.string().maxLength(2).optional(),
      zipCode: vine.string().maxLength(20).optional(),
      latitude: vine.number().optional(),
      longitude: vine.number().optional(),
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

      // Verificar se o usuário é do tipo profissional
      if (user.userType !== 'professional') {
        return response.forbidden({
          error: {
            message: 'Apenas usuários do tipo profissional podem criar perfis de profissional',
            code: 'INVALID_USER_TYPE',
          },
        })
      }

      // Verificar se já existe perfil de profissional para este usuário
      const existingProfessional = await Professional.findBy('user_id', user.id)
      if (existingProfessional) {
        return response.conflict({
          error: {
            message: 'Perfil de profissional já existe para este usuário',
            code: 'PROFILE_ALREADY_EXISTS',
          },
        })
      }

      // Validar dados
      const data = await vine.validate({
        schema: professionalSchema,
        data: request.all(),
      })

      // Criar perfil de profissional
      const professional = await Professional.create({
        userId: user.id,
        ...data,
        averageRating: 0,
        totalReviews: 0,
      })

      await professional.load('user')

      return response.created({
        message: 'Perfil de profissional criado com sucesso',
        professional: {
          id: professional.id,
          userId: professional.userId,
          specialty: professional.specialty,
          registrationNumber: professional.registrationNumber,
          bio: professional.bio,
          hourlyRate: professional.hourlyRate,
          experienceYears: professional.experienceYears,
          availableForEmergency: professional.availableForEmergency,
          address: professional.address,
          city: professional.city,
          state: professional.state,
          zipCode: professional.zipCode,
          latitude: professional.latitude,
          longitude: professional.longitude,
          averageRating: professional.averageRating,
          totalReviews: professional.totalReviews,
          createdAt: professional.createdAt,
          user: {
            id: professional.user.id,
            fullName: professional.user.fullName,
            email: professional.user.email,
            phoneNumber: professional.user.phoneNumber,
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
          message: 'Erro ao criar perfil de profissional',
          code: 'INTERNAL_ERROR',
        },
      })
    }
  }

  /**
   * Visualizar perfil de profissional
   * 
   * @route GET /api/professionals/:id
   */
  async show({ params, response }: HttpContext) {
    try {
      const professional = await Professional.query()
        .where('id', params.id)
        .preload('user')
        .firstOrFail()

      return response.ok({
        professional: {
          id: professional.id,
          userId: professional.userId,
          specialty: professional.specialty,
          registrationNumber: professional.registrationNumber,
          bio: professional.bio,
          hourlyRate: professional.hourlyRate,
          experienceYears: professional.experienceYears,
          availableForEmergency: professional.availableForEmergency,
          address: professional.address,
          city: professional.city,
          state: professional.state,
          zipCode: professional.zipCode,
          latitude: professional.latitude,
          longitude: professional.longitude,
          averageRating: professional.averageRating,
          totalReviews: professional.totalReviews,
          createdAt: professional.createdAt,
          updatedAt: professional.updatedAt,
          user: {
            id: professional.user.id,
            fullName: professional.user.fullName,
            email: professional.user.email,
            phoneNumber: professional.user.phoneNumber,
          },
        },
      })
    } catch (error) {
      return response.notFound({
        error: {
          message: 'Profissional não encontrado',
          code: 'PROFESSIONAL_NOT_FOUND',
        },
      })
    }
  }

  /**
   * Atualizar perfil de profissional
   * 
   * @route PUT /api/professionals/:id
   * @middleware auth
   */
  async update({ params, request, response, auth }: HttpContext) {
    // Validador de atualização de profissional
    const updateSchema = vine.object({
      specialty: vine.string().minLength(3).maxLength(100).optional(),
      registrationNumber: vine.string().maxLength(50).optional(),
      bio: vine.string().maxLength(1000).optional(),
      hourlyRate: vine.number().min(0).optional(),
      experienceYears: vine.number().min(0).optional(),
      availableForEmergency: vine.boolean().optional(),
      address: vine.string().maxLength(255).optional(),
      city: vine.string().maxLength(100).optional(),
      state: vine.string().maxLength(2).optional(),
      zipCode: vine.string().maxLength(20).optional(),
      latitude: vine.number().optional(),
      longitude: vine.number().optional(),
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

      const professional = await Professional.query()
        .where('id', params.id)
        .preload('user')
        .firstOrFail()

      // Verificar se o usuário autenticado é o dono do perfil
      if (professional.userId !== user.id) {
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
      professional.merge(data)
      await professional.save()

      return response.ok({
        message: 'Perfil de profissional atualizado com sucesso',
        professional: {
          id: professional.id,
          userId: professional.userId,
          specialty: professional.specialty,
          registrationNumber: professional.registrationNumber,
          bio: professional.bio,
          hourlyRate: professional.hourlyRate,
          experienceYears: professional.experienceYears,
          availableForEmergency: professional.availableForEmergency,
          address: professional.address,
          city: professional.city,
          state: professional.state,
          zipCode: professional.zipCode,
          latitude: professional.latitude,
          longitude: professional.longitude,
          averageRating: professional.averageRating,
          totalReviews: professional.totalReviews,
          updatedAt: professional.updatedAt,
          user: {
            id: professional.user.id,
            fullName: professional.user.fullName,
            email: professional.user.email,
            phoneNumber: professional.user.phoneNumber,
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
            message: 'Profissional não encontrado',
            code: 'PROFESSIONAL_NOT_FOUND',
          },
        })
      }

      return response.internalServerError({
        error: {
          message: 'Erro ao atualizar perfil de profissional',
          code: 'INTERNAL_ERROR',
        },
      })
    }
  }
}
