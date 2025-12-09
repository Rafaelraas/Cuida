import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('professional_id').unsigned().references('id').inTable('professionals').onDelete('CASCADE')
      table.integer('patient_id').unsigned().references('id').inTable('patients').onDelete('CASCADE')
      table.integer('booking_id').unsigned().references('id').inTable('bookings').onDelete('SET NULL').nullable()
      table.integer('rating').notNullable() // 1 to 5
      table.text('comment').nullable()
      table.boolean('would_recommend').defaultTo(true)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
