import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Employee from 'App/Models/Employee'
//import students from 'App/Models/Student'
export default class UsersController {
    public async create({request}:HttpContextContract){
        const table1 = new Employee()
        table1.id=request.input('id')
        table1.empname=request.input('name')
        table1.role=request.input('role')
        await table1.save()

        return Employee.all()
    }
    public async read(){
        return await Employee.all()
    }
    public async update(){
        const name1 = await Employee.findByOrFail('id',4)
        name1.role='CSE'
        name1.empname = 'Ankaiah'
        await name1.save()
        return Employee.all()
    }
    public async delete(){
        const name1 = await Employee.findByOrFail('id',3)
        await name1.delete()
        return Employee.all()
    }
    public async join(){
        const tableJoin = await Database.from("students")
        .join('employees','students.name', "=", 'employees.empname')
        .select("students.name")
        .select("students.city")
        .select("employees.id")
        .select("employees.role")


       return tableJoin
    }
}
