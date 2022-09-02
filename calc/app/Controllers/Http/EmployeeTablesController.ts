import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Employee from 'App/Models/EmployeeTable'
import EmployeeValidator from 'App/Validators/EmployeeTableValidator'
//import students from 'App/Models/Student'
export default class EmployeeTablesController {
    public async create({request}:HttpContextContract){
        const payload = await request.validate(EmployeeValidator)
        const table1 = new Employee()
        table1.id=payload['id']
        table1.empname=payload['empname']
        table1.role=payload['role']
        await table1.save()

        return Employee.all()
    }
    public async read(){
        return await Employee.all()
    }
    public async update({request}:HttpContextContract){
        const val = await request.validate(EmployeeValidator)
        const name1 = await Employee.findOrFail(request.input('id'))
        name1.empname = val['name']
        name1.role = val['city']
        await name1.save()
        return Employee.all()
    }
    public async delete(){
        const name1 = await Employee.findByOrFail('id',3)
        await name1.delete()
        return Employee.all()
    }
    public async join(){
        const tableJoin = await Database.from("employees")
        .join('empaddresses','employees.empname', "=", 'empaddresses.name')
        .select("employees.*")
        .select("empaddresses.city")
       return tableJoin
    }
    public async readbyid({request}:HttpContextContract){
        const readid=await Database.from('employees').where('id', request.input('id'))
        return readid
    }
}
