import router from '@adonisjs/core/services/router'

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

// API routes will be added here
// Example structure:
// router.group(() => {
//   router.post('/register', [AuthController, 'register'])
//   router.post('/login', [AuthController, 'login'])
// }).prefix('/api/auth')
