import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import CustomerValidator from 'App/Validators/CustomerValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CustomersController {
    public async create({request}:HttpContextContract){
        try{
            const payload = await request.validate(CustomerValidator)
            const table1 = new Customer()
            table1.id = payload['id']
            table1.name = payload['name']
            await  table1.save()
            return Customer.all()
        }
        catch{
             return 'enter correct values.'
        }
    }
    public async read(){
        return Customer.all()
    }
    public async update({request}:HttpContextContract){
        try{
            const val = await request.validate(CustomerValidator)
            const name1 = await Customer.findOrFail(val['id'])
            name1.name = val['name']
            await name1.save()
            return Customer.all()
        }
        catch {
            return 'enter correct details.'
        }
    }
    public async delete({ request }: HttpContextContract) {
        try {
            const name1 = await Customer.findOrFail(request.params().id)
            await name1.delete()
            return Customer.all()
        }
        catch {
            return 'enter correct details'
        }
    }
    public async search({ request }: HttpContextContract) {
        try {
            const val = request.input('val')
            return Database
                .from('customers')
                .select('*')
                .where((query) => {
                    if (/^[0-9]/.test(val)) {
                        query
                            .where('id', val)
                            .orWhere('name', 'ilike', '%' + val + '%')
                    }
                })
                .orWhere((query) => {
                    query
                        .where('name', 'ilike', '%' + val + '%')
                })
        }
        catch {
            return 'Enter correctly!!'
        }
    }
    public async idAsc() {
        return Customer.query().orderBy("id", "asc")
    }
    public async idDesc() {
        return Customer.query().orderBy("id", "desc")
    }
    public async nameAsc() {
        return Customer.query().orderBy("name", "asc")
    }
    public async nameDesc() {
        return Customer.query().orderBy("name", "desc")
    }
}
