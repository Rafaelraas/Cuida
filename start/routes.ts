import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const ProfessionalsController = () => import('#controllers/professionals_controller')
const PatientsController = () => import('#controllers/patients_controller')

// Home route
router.get('/', async () => {
  return {
    message: 'Bem-vindo à Plataforma Cuida',
    description: 'API para conectar profissionais de saúde com pessoas que precisam de cuidado',
    version: '1.0.0',
  }
})

// Health check
router.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// Authentication routes
router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
    router.get('/me', [AuthController, 'me']).use(middleware.auth())
  })
  .prefix('/api/auth')

// Professional routes
router
  .group(() => {
    router.post('/', [ProfessionalsController, 'store']).use(middleware.auth())
    router.get('/:id', [ProfessionalsController, 'show'])
    router.put('/:id', [ProfessionalsController, 'update']).use(middleware.auth())
  })
  .prefix('/api/professionals')

// Patient routes
router
  .group(() => {
    router.post('/', [PatientsController, 'store']).use(middleware.auth())
    router.get('/:id', [PatientsController, 'show']).use(middleware.auth())
    router.put('/:id', [PatientsController, 'update']).use(middleware.auth())
  })
  .prefix('/api/patients')
