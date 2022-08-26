// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProjectsController {
    public async add({request})
    {
        let a:number = request.input('a');
        let b:number = request.input('b');
        return a+b;
    }
    public async sub({request})
    {
        let a:number = request.input('a');
        let b:number = request.input('b');
        return a-b;
    }
    public async mul({request})
    {
        let a:number = request.input('a');
        let b:number = request.input('b');
        return a*b;
    }
    public async div({request})
    {
        let a:number = request.input('a');
        let b:number = request.input('b');
        return a/b;
    }
}
