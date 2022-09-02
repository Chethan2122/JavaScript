import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Empaddress from 'App/Models/Empaddress'
import AddressValidator from 'App/Validators/EmpaddressValidator'
//import students from 'App/Models/Student'
export default class EmployeeTablesController {
    public async add({request}:HttpContextContract){
        const payload = await request.validate(AddressValidator)
        const table1 = new Empaddress()
        table1.id=payload['id']
        table1.name=payload['name']
        table1.city=payload['role']
        await table1.save()

        return Empaddress.all()
    }
    public async know(){
        return await Empaddress.all()
    }
    public async upgrade({request}:HttpContextContract){
        const val = await request.validate(AddressValidator)
        const name1 = await Empaddress.findOrFail(request.input('id'))
        name1.name = val['name']
        name1.city = val['city']
        await name1.save()
        return Empaddress.all()
    }
    public async remove(){
        const name1 = await Empaddress.findByOrFail('id',3)
        await name1.delete()
        return Empaddress.all()
    }
    public async combine(){
        const tableJoin = await Database.from("employees")
        .join('empaddresses','employees.empname', "=", 'empaddresses.name')
        .select("employees.*")
        .select("empaddresses.city")
       return tableJoin
    }
}
