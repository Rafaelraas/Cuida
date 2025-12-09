#!/usr/bin/env node

import 'reflect-metadata'
import { Ignitor, prettyPrintError } from '@adonisjs/core'

const ignitor = new Ignitor(new URL('../', import.meta.url))

try {
  await ignitor
    .tap((app) => {
      app.booting(async () => {
        await import('#start/env')
      })
      app.listen('SIGTERM', () => app.terminate())
      app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate())
    })
    .httpServer()
    .start()
} catch (error) {
  process.exitCode = 1
  prettyPrintError(error)
}
