import BaseSchema from '@ioc:Adonis/Lucid/Schema'
// import Project1 from 'App/Models/Project1'

export default class extends BaseSchema {
  protected tableName = 'project1s'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('a')
      table.integer('b')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}