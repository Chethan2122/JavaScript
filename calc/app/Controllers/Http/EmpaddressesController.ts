import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Empaddress from 'App/Models/Empaddress'
import AddressValidator from 'App/Validators/EmpaddressValidator'
//import students from 'App/Models/Student'
export default class EmployeeTablesController {
    public async add({request}:HttpContextContract){
        try{
        const payload = await request.validate(AddressValidator)
        const table1 = new Empaddress()
        table1.id=payload['id']
        table1.name=payload['name']
        table1.city=payload['city']
        await table1.save()
        return Empaddress.all()
        }
        catch{
            return 'enter corret details.'
        }
    }
    public async know(){
        return await Empaddress.all()
    }
    public async upgrade({request}:HttpContextContract){
        try{
            const val = await request.validate(AddressValidator)
            const name1 = await Empaddress.findOrFail(val['id'])
            name1.name = val['name']
            name1.city = val['city']
            await name1.save()
            return Empaddress.all()
        }
        catch{
            return 'enter correct details.'
        }
    }
    public async remove({request}:HttpContextContract){
        try{
            //const val = await request.validate(AddressValidator)
            const name1 = await Empaddress.findOrFail(request.input('id'))
            await name1.delete()
            return Empaddress.all()
        }
        catch{
            return 'enter corret details.'
        }
    }
    public async combine(){
        try{
        const tableJoin = await Database.from("employees")
        .join('empaddresses','employees.id', "=", 'empaddresses.id')
        .select("employees.*")
        .select("empaddresses.*")
        return tableJoin
        }
        catch{
            return 'enter corret details.'
        }
    }
    public async searchbyid({request}:HttpContextContract){
        try{
            //const val = await request.validate(AddressValidator)
            const tableJoin = await Database.from("employees")
            .join('empaddresses','employees.id', "=", 'empaddresses.id')
            .select("employees.*")
            .select("empaddresses.*")
            .where('empaddresses.id', '=', request.input('id'))
            return tableJoin
        }
        catch{
            return 'enter correct details.'
        }
    }
    public async searchbyname({request}:HttpContextContract){
        try{
            //const val = await request.validate(AddressValidator)
            const tableJoin = await Database.from("employees")
            .join('empaddresses','employees.empname', "=", 'empaddresses.name')
            .select("employees.*")
            .select("empaddresses.city")
            .where('empaddresses.name', '=', request.input('name'))
            return tableJoin
        }
        catch{
            return 'enter correct details.'
        }
    }
}
