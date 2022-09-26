import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel'
import HotelValidator from 'App/Validators/HotelValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CustomersController {
    public async create({ request }: HttpContextContract) {
        try {
            const payload = await request.validate(HotelValidator)
            const table1 = new Hotel()
            table1.hotelid = payload['hotelid']
            table1.customerid = payload['customerid']
            table1.hotelname = payload['hotelname']
            table1.doorno = payload['doorno']
            table1.street = payload['street']
            table1.landmark = payload['landmark']
            table1.area = payload['area']
            await table1.save()
            return Hotel.all()
        }
        catch {
            return 'enter correct values.'
        }
    }
    public async read() {
        return Hotel.query().orderBy("hotelid", "asc")
    }
    public async update({ request }: HttpContextContract) {
        try {
            const val = await request.validate(HotelValidator)
            const name1 = await Hotel.findOrFail(val['hotelid'])
            name1.customerid = val['cutomerid']
            name1.hotelname = val['hotelname']
            name1.doorno = val['doorno']
            name1.street = val['street']
            name1.landmark = val['landmark']
            name1.area = val['area']
            await name1.save()
            return Hotel.all()
        }
        catch {
            return 'enter correct details.'
        }
    }
    public async delete({ request }: HttpContextContract) {
        try {
            var name1 = await Hotel.findOrFail(request.params().id)
            await name1.delete()
            return Hotel.all()
        }
        catch {
            return 'enter correct details'
        }
    }
    public async search({ request }: HttpContextContract) {
        try {
            var val = request.input('val')
            var search = await Hotel.query()
                .leftJoin('customers', 'customers.id', '=', 'hotels.customerid')
                .select('hotels.hotelid', 'hotels.customerid', 'hotels.hotelname', 'customers.name')
                .select(Database.raw(`json_build_object('doorno', doorno, 'street',street,'landmark',landmark,'area',area) as address`))
                // .select('hotels.*')
                // .select('customers.name')
                .where((query) => {
                    if (/^[0-9]/.test(val)) {
                        query
                            .where('hotelid', val)
                            .orWhere('customerid', val)
                    }
                })
                .orWhere((query) => {
                    query
                        .where('hotelname', 'ilike', '%' + val + '%')
                        .orWhere('doorno', 'ilike', '%' + val + '%')
                        .orWhere('street', 'ilike', '%' + val + '%')
                        .orWhere('landmark', 'ilike', '%' + val + '%')
                        .orWhere('area', 'ilike', '%' + val + '%')
                        .orWhere('name', 'ilike', '%' + val + '%')
                })
                .then(table =>
                    table.map(h => {
                        var data = h.toJSON()
                        return {
                            ...data,
                            customername: h.$extras.name,
                            address: h.$extras.address
                        }
                    })
                )
            return search
        }
        catch {
            return 'Enter correctly!!'
        }
    }
    public async join() {
        let a = await Hotel.query()
            .leftJoin('customers', 'customers.id', '=', 'hotels.customerid')
            .select('hotels.*')
            .select('customers.name')
            .orderBy('hotels.hotelid', 'asc')
            .then(table =>
                table.map(h => {
                    var data = h.toJSON()
                    return {
                        ...data,
                        customername: h.$extras.name,
                    }
                })
            )
        return a
    }
    public async address() {
        var address = await Hotel.query()
            .leftJoin('customers', 'customers.id', '=', 'hotels.customerid')
            .select('hotels.hotelid', 'hotels.customerid', 'hotels.hotelname', 'customers.name')
            .select(Database.raw(`json_build_object('doorno', doorno, 'street',street,'landmark',landmark,'area',area) as address`))
            .then(table =>
                table.map(h => {
                    var data = h.toJSON()
                    return {
                        ...data,
                        customername: h.$extras.name,
                        address: h.$extras.address
                    }
                }))
        return address
    }
    public async sortBy({ request }: HttpContextContract) {
        var sortBy = request.input('sortBy')
        var sortAs = request.input('ascDesc')
        let sort = await Hotel.query()
            .leftJoin('customers', 'customers.id', '=', 'hotels.customerid')
            .select('hotels.hotelid', 'hotels.customerid', 'hotels.hotelname', 'customers.name')
            .select(Database.raw(`json_build_object('doorno', doorno, 'street',street,'landmark',landmark,'area',area) as address`))
            .orderBy(sortBy, sortAs)
            .then(table =>
                table.map(h => {
                    var data = h.toJSON()
                    return {
                        ...data,
                        customername: h.$extras.name,
                        address: h.$extras.address
                    }
                })
            )
        return sort
    }
}






    // public async hIdAsc() {
    //     return Database
    //         .from('hotels')
    //         .leftJoin('customers', 'customers.id', '=', 'hotels.customerid')
    //         .select('hotels.*')
    //         .select('customers.name')
    //         .orderBy("hotelid", "asc")
    // }
    // public async hIdDesc() {
    //     return Database
    //         .from('hotels')
    //         .leftJoin('customers', 'customers.id', '=', 'hotels.customerid')
    //         .select('hotels.*')
    //         .select('customers.name')
    //         .orderBy("hotelid", "desc")
    // }
    // public async cIdAsc() {
    //     return Database
    //         .from('hotels')
    //         .leftJoin('customers', 'customers.id', '=', 'hotels.customerid')
    //         .select('hotels.*')
    //         .select('customers.name')
    //         .orderBy("customerid", "asc")
    // }
    // public async cIdDesc() {
    //     return Database
    //         .from('hotels')
    //         .leftJoin('customers', 'customers.id', '=', 'hotels.customerid')
    //         .select('hotels.*')
    //         .select('customers.name')
    //         .orderBy("customerid", "desc")
    // }
    // public async nameAsc() {
    //     return Database
    //         .from('hotels')
    //         .leftJoin('customers', 'customers.id', '=', 'hotels.customerid')
    //         .select('hotels.*')
    //         .select('customers.name')
    //         .orderBy("hotelname", "asc")
    // }
    // public async nameDesc() {
    //     return Database
    //         .from('hotels')
    //         .leftJoin('customers', 'customers.id', '=', 'hotels.customerid')
    //         .select('hotels.*')
    //         .select('customers.name')
    //         .orderBy("hotelname", "desc")
    // }

