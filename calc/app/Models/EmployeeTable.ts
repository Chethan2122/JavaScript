//import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public empname: string
  @column()
  public role: string
}
// module.exports='Employee_table'