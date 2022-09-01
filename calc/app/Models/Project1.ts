
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Project1 extends BaseModel {
  @column()
    public id:number
  @column()
    public a:number
  @column()
    public b:number
}
module.exports='Project1'