import { Ignitor, prettyPrintError } from '@adonisjs/core'
import { configure, processCLIArgs, run } from '@japa/runner'
import { assert } from '@japa/assert'
import { apiClient } from '@japa/api-client'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'

/**
 * URL to the application root. AdonisJS need it to resolve
 * paths to file and directories for scaffolding commands
 */
const APP_ROOT = new URL('../', import.meta.url)

/**
 * The importer is used to import files in memory and
 * execute them. It is used by Japa to import test files
 */
const IMPORTER = (filePath: string) => {
  if (filePath.startsWith('./') || filePath.startsWith('../')) {
    return import(new URL(filePath, APP_ROOT).href)
  }
  return import(filePath)
}

/**
 * Configure Japa runner with plugins
 */
configure({
  files: ['tests/**/*.spec.ts'],
  plugins: [
    assert(),
    apiClient(),
    pluginAdonisJS(
      new Ignitor(APP_ROOT, { importer: IMPORTER }).tap((app) => {
        app.booting(async () => {
          await import('#start/env')
        })
        app.listen('SIGTERM', () => app.terminate())
        app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate())
      })
    ),
  ],
  reporters: {
    activated: ['spec'],
  },
  importer: IMPORTER,
})

/**
 * Run tests
 */
try {
  processCLIArgs(process.argv.slice(2))
  await run()
} catch (error) {
  await prettyPrintError(error)
  process.exit(1)
}
