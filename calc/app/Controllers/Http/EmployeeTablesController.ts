import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Employee from 'App/Models/EmployeeTable'
import EmployeeValidator from 'App/Validators/EmployeeTableValidator'
export default class EmployeeTablesController {
    public async create({request}:HttpContextContract){
        try{
            const payload = await request.validate(EmployeeValidator)
            const table1 = new Employee()
            table1.id=payload['id']
            table1.empname=payload['empname']
            table1.role=payload['role']
            await table1.save()
            return Employee.all()
        }
        catch{
            return 'enter correct details.'
        }
    }
    public async read(){
        return await Employee.all()
    }
    public async update({request}:HttpContextContract){
        try{
            const val = await request.validate(EmployeeValidator)
            const name1 = await Employee.findOrFail(val['id'])
            name1.empname = val['empname']
            name1.role = val['role']
            await name1.save()
            return Employee.all()
        }
        catch{
            return 'enter correct details.'
        }
    }
    public async delete({request}:HttpContextContract){
        try{
            const val = await request.validate(EmployeeValidator)
            const name1 = await Employee.findOrFail(val['id'])
            await name1.delete()
            return Employee.all()
        }
        catch{
            return 'enter correct details'
        }
    }
    public async join(){
        const tableJoin = await Database.from("employees")
        .join('empaddresses','employees.empname', "=", 'empaddresses.name')
        .select("employees.*")
        .select("empaddresses.city")
       return tableJoin
    }
    public async readbyid({request}:HttpContextContract){
        try{
            const val = await request.validate(EmployeeValidator)
            const readid=await Database.from('employees').where('id', val['id'])
            return readid
        }
        catch{
            return 'enter correct details.'
        }
    }
}
