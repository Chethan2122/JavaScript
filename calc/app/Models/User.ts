//import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
    static save() {
        throw new Error('Method not implemented.')
    }
  @column({ isPrimary: true })
  public id: number

 @column()
 public name:string
 @column()
 public branch:string
}
