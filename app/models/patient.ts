import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare dateOfBirth: DateTime | null

  @column()
  declare address: string | null

  @column()
  declare city: string | null

  @column()
  declare state: string | null

  @column()
  declare zipCode: string | null

  @column()
  declare latitude: number | null

  @column()
  declare longitude: number | null

  @column()
  declare emergencyContactName: string | null

  @column()
  declare emergencyContactPhone: string | null

  @column()
  declare medicalConditions: string | null // JSON string with medical conditions

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
