import { defineConfig } from '@adonisjs/cors'
import env from '#start/env'

export default defineConfig({
  enabled: env.get('CORS_ENABLED'),
  origin: env.get('CORS_ORIGIN'),
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: env.get('CORS_CREDENTIALS'),
  maxAge: 90,
})
