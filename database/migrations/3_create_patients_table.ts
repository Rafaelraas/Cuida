import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'patients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.date('date_of_birth').nullable()
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('state', 2).nullable()
      table.string('zip_code', 10).nullable()
      table.decimal('latitude', 10, 7).nullable()
      table.decimal('longitude', 10, 7).nullable()
      table.string('emergency_contact_name').nullable()
      table.string('emergency_contact_phone', 20).nullable()
      table.text('medical_conditions').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
