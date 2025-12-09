import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Professional extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare specialty: string // Ex: Cuidador, Fisioterapeuta, Enfermeiro, etc.

  @column()
  declare registrationNumber: string | null // Número de registro profissional (COREN, CREFITO, etc.)

  @column()
  declare bio: string | null

  @column()
  declare hourlyRate: number | null // Taxa por hora em reais

  @column()
  declare experienceYears: number | null

  @column()
  declare availableForEmergency: boolean

  @column()
  declare latitude: number | null

  @column()
  declare longitude: number | null

  @column()
  declare address: string | null

  @column()
  declare city: string | null

  @column()
  declare state: string | null

  @column()
  declare zipCode: string | null

  @column()
  declare averageRating: number

  @column()
  declare totalReviews: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
