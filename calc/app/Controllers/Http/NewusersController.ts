import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Newuser from 'App/Models/Newuser'
import table from 'App/Models/Newuser'
export default class NewusersController {
    public async create({request}:HttpContextContract){
        let table2 = new table()
        table2.name = request.input('sname')
        table2.city = request.input('city')
        table2.save()
        return Newuser.all()
    }
    public async read(){
        return await Newuser.all()
    }
    public async update(){
        const name1 = await Newuser.findByOrFail('id',3)
        name1.id=1
        await name1.save()
        return Newuser.all()
    }
    public async delete(){
        const name1 = await Newuser.findByOrFail('id',4)
        await name1.delete()
        return Newuser.all()
    }
}
