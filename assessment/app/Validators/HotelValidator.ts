import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({
    "hotelid": schema.number(),
    "customerid":schema.number(),
    "hotelname": schema.string(),
    "doorno":schema.string(),
    "street":schema.string(),
    "landmark":schema.string(),
    "area":schema.string()

  })

  
  public messages: CustomMessages = {}
}
