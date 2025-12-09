import { defineConfig } from '@adonisjs/core/app'
import env from '#start/env'

export default defineConfig({
  appKey: env.get('APP_KEY'),
  http: {
    allowMethodSpoofing: false,
    generateRequestId: false,
    trustProxy: false,
    cookie: {
      domain: '',
      path: '/',
      maxAge: '2h',
      httpOnly: true,
      secure: false,
      sameSite: false,
    },
  },
})
