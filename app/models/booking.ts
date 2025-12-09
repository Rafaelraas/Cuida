import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Professional from './professional.js'
import Patient from './patient.js'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare professionalId: number

  @column()
  declare patientId: number

  @column.dateTime()
  declare scheduledDate: DateTime

  @column()
  declare durationHours: number

  @column()
  declare status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'

  @column()
  declare totalPrice: number

  @column()
  declare serviceDescription: string | null

  @column()
  declare location: string | null

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Professional)
  declare professional: BelongsTo<typeof Professional>

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>
}
