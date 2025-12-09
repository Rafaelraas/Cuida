import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  commands: [
    () => import('@adonisjs/core/commands'),
    () => import('@adonisjs/lucid/commands'),
  ],
  
  commandsAliases: {},
  
  tests: {
    suites: [
      {
        files: ['tests/**/*.spec.ts'],
        name: 'functional',
        timeout: 60000,
      },
    ],
    forceExit: false,
  },
  
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    {
      file: () => import('@adonisjs/core/providers/edge_provider'),
      environment: ['web'],
    },
    () => import('@adonisjs/lucid/database_provider'),
    () => import('@adonisjs/auth/auth_provider'),
    () => import('@adonisjs/session/session_provider'),
    () => import('@adonisjs/cors/cors_provider'),
    // Note: http_provider is not needed in AdonisJS 6 - HTTP functionality is built into core
  ],
  
  metaFiles: [
    {
      pattern: 'resources/views/**/*.edge',
      reloadServer: false,
    },
    {
      pattern: 'public/**',
      reloadServer: false,
    },
  ],
  
  assetsBundler: false,
})
