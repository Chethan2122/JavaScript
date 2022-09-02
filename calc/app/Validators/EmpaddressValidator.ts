import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    "id" : schema.number(),
    "name" : schema.string(),
    "city" : schema.string()
  })

  
  public messages: CustomMessages = {}
}
