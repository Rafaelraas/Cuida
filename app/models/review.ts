import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Professional from './professional.js'
import Patient from './patient.js'
import Booking from './booking.js'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare professionalId: number

  @column()
  declare patientId: number

  @column()
  declare bookingId: number | null

  @column()
  declare rating: number // 1 to 5

  @column()
  declare comment: string | null

  @column()
  declare wouldRecommend: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Professional)
  declare professional: BelongsTo<typeof Professional>

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>

  @belongsTo(() => Booking)
  declare booking: BelongsTo<typeof Booking>
}
