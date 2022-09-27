import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Midwar {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    let auth = 'abcd'
    if(auth !== request.header('auth')){
      response.unauthorized({error:'Unauthorized'})
      return
    }
    await next()
  }
}
