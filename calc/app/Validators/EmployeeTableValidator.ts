import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmployeeValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    "id" : schema.number(),
    "empname" : schema.string(),
    "role" : schema.string()
  })

  
  public messages: CustomMessages = {}
}
