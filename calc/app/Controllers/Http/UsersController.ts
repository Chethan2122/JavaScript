import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import table from 'App/Models/User'
export default class UsersController {
    public async create({request}:HttpContextContract){
        let table1 = new table()
        table1.id=request.input('id')
        table1.name=request.input('name')
        table1.branch=request.input('branch')
        table1.save()
        return "Successfully inserted"
    }
    public async read(){
        return await User.all()
    }
    public async update(){
        const name1 = await User.findByOrFail('id',3)
        name1.branch='AI'
        await name1.save()
        return User.all()
    }
    public async delete(){
        const name1 = await User.findByOrFail('id',3)
        await name1.delete()
        return User.all()
    }
}
