import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

server.use([
  () => import('@adonisjs/cors/cors_middleware'),
])

server.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
])

server.use([
  () => import('@adonisjs/session/session_middleware'),
])

// Rate limiter middleware (optional)
// router.use([
//   () => import('@adonisjs/core/limiter_middleware'),
// ])

/**
 * Named middleware collection for registering
 * middleware on routes
 */
export const middleware = router.named({
  auth: () => import('#middleware/auth_middleware'),
})
