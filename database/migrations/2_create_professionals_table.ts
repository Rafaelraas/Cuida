import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'professionals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('specialty').notNullable()
      table.string('registration_number').nullable()
      table.text('bio').nullable()
      table.decimal('hourly_rate', 10, 2).nullable()
      table.integer('experience_years').nullable()
      table.boolean('available_for_emergency').defaultTo(false)
      table.decimal('latitude', 10, 7).nullable()
      table.decimal('longitude', 10, 7).nullable()
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('state', 2).nullable()
      table.string('zip_code', 10).nullable()
      table.decimal('average_rating', 3, 2).defaultTo(0)
      table.integer('total_reviews').defaultTo(0)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
