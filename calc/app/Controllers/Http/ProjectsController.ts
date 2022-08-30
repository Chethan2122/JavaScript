import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ValidationValidator from 'App/Validators/ValidationValidator'

export default class ProjectsController {
    public async all({request}:HttpContextContract)
    {
        const payload = await request.validate(ValidationValidator)
        let a:number = payload["a"];
        let b:number = payload["b"];
        return 'sum : '+(a+b)+'\n'+'sub : '+(a-b)+'\n'+'mul : '+(a*b)+'\n'+'div : '+(a/b);
    }
    
}
