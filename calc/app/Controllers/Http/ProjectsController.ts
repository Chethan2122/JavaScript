// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProjectsController {
    public async all({request})
    {
        let a:number = request.input('a');
        let b:number = request.input('b');
        return 'sum : '+(a+b)+'\n'+'sub : '+(a-b)+'\n'+'mul : '+(a*b)+'\n'+'div : '+(a/b);
    }
}
