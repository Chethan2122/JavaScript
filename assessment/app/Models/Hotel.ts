import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public hotelid: number
  @column()
  public customerid: number
  @column()
  public hotelname: string
  @column()
  public doorno: string
  @column()
  public street: string
  @column()
  public landmark: string
  @column()
  public area: string

}
