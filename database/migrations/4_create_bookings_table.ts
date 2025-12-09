import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('professional_id').unsigned().references('id').inTable('professionals').onDelete('CASCADE')
      table.integer('patient_id').unsigned().references('id').inTable('patients').onDelete('CASCADE')
      table.timestamp('scheduled_date').notNullable()
      table.integer('duration_hours').notNullable()
      table.enum('status', ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']).defaultTo('pending')
      table.decimal('total_price', 10, 2).notNullable()
      table.text('service_description').nullable()
      table.string('location').nullable()
      table.text('notes').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
