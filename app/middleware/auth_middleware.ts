import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used to authenticate HTTP requests
 * and deny access to unauthenticated users.
 */
export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Authenticate the current HTTP request and return the user instance
     * or throw an exception
     */
    await ctx.auth.use('web').authenticate()

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}