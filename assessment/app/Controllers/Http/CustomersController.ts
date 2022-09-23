import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import CustomerValidator from 'App/Validators/CustomerValidator'
//import Database from '@ioc:Adonis/Lucid/Database'

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
        return Customer.query().orderBy("id", "asc")
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
            const search = await Customer.query()
            .leftJoin('hotels','customers.id','=','hotels.customerid')
            .select('customers.*')
            .groupBy('customers.id')
            .count('hotels.customerid as totalhotels')
                .where((query) => {
                    if (/^[0-9]/.test(val)) {
                        query
                            .where('id', val)
                            // .orWhere('name', 'ilike', '%' + val + '%')
                    }
                })
                .orWhere((query) => {
                    query
                        .where('name', 'ilike', '%' + val + '%')
                })
                .then(d =>                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                    d.map(h => {
                     const data = h.toJSON()
                     return {
                        ...data,
                        totalhotels: h.$extras.totalhotels,
                     }
                   })
                 )
                return search
        }
        catch {
            return 'Enter correctly!!'
        }
    }
    public async sortBy({request}:HttpContextContract){
        var sortBy = request.input('sortBy')
        var sortAs = request.input('ascDesc')
        var a = await Customer.query()
        .leftJoin('hotels','customers.id','=','hotels.customerid')
        .select('customers.*')
        .groupBy('customers.id')
        .count('hotels.customerid as totalhotels')
        .orderBy(sortBy,sortAs)
        .then(d =>                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            d.map(h => {
             const data = h.toJSON()
             return {
                ...data,
                totalhotels: h.$extras.totalhotels,
             }
           })
         )
         return a
    }
    public async count(){
        let a = await Customer.query()
        .leftJoin('hotels','customers.id','=','hotels.customerid')
        .select('customers.*')
        .groupBy('customers.id')
        .count('hotels.customerid as totalhotels')
        .orderBy('customers.id','asc')
        .then(d =>                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            d.map(h => {
             const data = h.toJSON()
             return {
                ...data,
                totalhotels: h.$extras.totalhotels,
             }
           })
         )
         return a
    }
}






    // public async idAsc() {
    //     var idasc = Database
    //     .from('customers')
    //     .leftJoin('hotels','customers.id','=','hotels.customerid')
    //     .select('customers.*')
    //     .groupBy('customers.id')
    //     .count('hotels.customerid as totalhotels')
    //     return idasc.orderBy('id','asc')
    // }
    // public async idDesc() {
    //     var iddesc = Database
    //     .from('customers')
    //     .leftJoin('hotels','customers.id','=','hotels.customerid')
    //     .select('customers.*')
    //     .groupBy('customers.id')
    //     .count('hotels.customerid as totalhotels')
    //     return iddesc.orderBy('id','desc')
    // }
    // public async nameAsc() {
    //     var nameasc = Database
    //     .from('customers')
    //     .leftJoin('hotels','customers.id','=','hotels.customerid')
    //     .select('customers.*')
    //     .groupBy('customers.id')
    //     .count('hotels.customerid as totalhotels')
    //     return nameasc.orderBy('name','asc')
    // }
    // public async nameDesc() {
    //     var namedesc = Database
    //     .from('customers')
    //     .leftJoin('hotels','customers.id','=','hotels.customerid')
    //     .select('customers.*')
    //     .groupBy('customers.id')
    //     .count('hotels.customerid as totalhotels')
    //     return namedesc.orderBy('name','desc')    
    // }
