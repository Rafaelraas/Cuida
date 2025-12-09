import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

/**
 * Controller de Autenticação
 * 
 * Responsável por gerenciar registro, login e logout de usuários
 */
export default class AuthController {
  /**
   * Registrar novo usuário
   * 
   * @route POST /api/auth/register
   */
  async register({ request, response }: HttpContext) {
    // Validador de dados de registro
    const registerSchema = vine.object({
      fullName: vine.string().minLength(3).maxLength(255),
      email: vine.string().email().normalizeEmail(),
      password: vine.string().minLength(8).maxLength(255),
      userType: vine.enum(['professional', 'patient']),
      phoneNumber: vine.string().optional(),
    })

    try {
      // Validar dados
      const data = await vine.validate({
        schema: registerSchema,
        data: request.all(),
      })

      // Verificar se email já existe
      const existingUser = await User.findBy('email', data.email)
      if (existingUser) {
        return response.conflict({
          error: {
            message: 'Email já cadastrado',
            code: 'EMAIL_ALREADY_EXISTS',
          },
        })
      }

      // Criar usuário
      const user = await User.create(data)

      return response.created({
        message: 'Usuário registrado com sucesso',
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          userType: user.userType,
          phoneNumber: user.phoneNumber,
          createdAt: user.createdAt,
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
          message: 'Erro ao registrar usuário',
          code: 'INTERNAL_ERROR',
        },
      })
    }
  }

  /**
   * Login de usuário
   * 
   * @route POST /api/auth/login
   */
  async login({ request, response, auth }: HttpContext) {
    // Validador de login
    const loginSchema = vine.object({
      email: vine.string().email().normalizeEmail(),
      password: vine.string(),
    })

    try {
      // Validar dados
      const { email, password } = await vine.validate({
        schema: loginSchema,
        data: request.all(),
      })

      // Verificar credenciais usando o AuthFinder mixin
      const user = await User.verifyCredentials(email, password)

      if (!user) {
        return response.unauthorized({
          error: {
            message: 'Credenciais inválidas',
            code: 'INVALID_CREDENTIALS',
          },
        })
      }

      // Verificar se usuário está ativo
      if (!user.isActive) {
        return response.forbidden({
          error: {
            message: 'Usuário inativo',
            code: 'USER_INACTIVE',
          },
        })
      }

      // Criar sessão
      await auth.use('web').login(user)

      return response.ok({
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          userType: user.userType,
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
          message: 'Erro ao fazer login',
          code: 'INTERNAL_ERROR',
        },
      })
    }
  }

  /**
   * Logout de usuário
   * 
   * @route POST /api/auth/logout
   * @middleware auth
   */
  async logout({ response, auth }: HttpContext) {
    // Destruir sessão
    await auth.use('web').logout()

    return response.ok({
      message: 'Logout realizado com sucesso',
    })
  }

  /**
   * Verificar usuário autenticado
   * 
   * @route GET /api/auth/me
   * @middleware auth
   */
  async me({ response, auth }: HttpContext) {
    // Retornar usuário autenticado
    const user = auth.use('web').user

    if (!user) {
      return response.unauthorized({
        error: {
          message: 'Não autenticado',
          code: 'NOT_AUTHENTICATED',
        },
      })
    }

    return response.ok({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        phoneNumber: user.phoneNumber,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  }
}
