import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'hotels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('hotelid')
      table.integer('customerid')
      table.string('hotelname')
      table.string('doorno')
      table.string('street')
      table.string('landmark')
      table.string('area')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
