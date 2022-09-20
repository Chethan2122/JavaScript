import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel'
import HotelValidator from 'App/Validators/HotelValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CustomersController {
    public async create({request}:HttpContextContract){
        try{
            const payload = await request.validate(HotelValidator)
            const table1 = new Hotel()
            table1.hotelid = payload['hotelid']
            table1.customerid = payload['customerid']
            table1.hotelname = payload['hotelname']
            table1.doorno = payload['doorno']
            table1.street = payload['street']
            table1.landmark = payload['landmark']
            table1.area = payload['area']
            await  table1.save()
            return Hotel.all()
        }
        catch{
             return 'enter correct values.'
        }
    }
    public async read(){
        return Hotel.all()
    }
    public async update({request}:HttpContextContract){
        try{
            const val = await request.validate(HotelValidator)
            const name1 = await Hotel.findOrFail(val['hotelid'])
            name1.customerid = val['cutomerid']
            name1.hotelname = val['hotelname']
            name1.doorno = val['doorno']
            name1.street = val['street']
            name1.landmark = val['lanmark']
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
            const name1 = await Hotel.findOrFail(request.params().id)
            await name1.delete()
            return Hotel.all()
        }
        catch {
            return 'enter correct details'
        }
    }
    public async search({ request }: HttpContextContract) {
        try {
            const val = request.input('val')
            return Database
                .from('hotels')
                .select('*')
                .where((query) => {
                    if (/^[0-9]/.test(val)) {
                        query
                            .where('hotelid', val)
                            .orWhere('customerid', val)
                            .orWhere('hotelname', 'ilike', '%' + val + '%')
                            .orWhere('doorno', 'ilike', '%' + val + '%')
                            .orWhere('street', 'ilike', '%' + val + '%')
                            .orWhere('landmark', 'ilike', '%' + val + '%')
                            .orWhere('area', 'ilike', '%' + val + '%')
                    }
                })
                .orWhere((query) => {
                    query
                        .where('hotelname', 'ilike', '%' + val + '%')
                        .orWhere('doorno', 'ilike', '%' + val + '%')
                        .orWhere('street', 'ilike', '%' + val + '%')
                        .orWhere('landmark', 'ilike', '%' + val + '%')
                        .orWhere('area', 'ilike', '%' + val + '%')
                })
        }
        catch {
            return 'Enter correctly!!'
        }
    }
    public async address({request}){
        var hotelid = request.params().id
        return Database
        .from('hotels')
        .select('doorno','street','landmark','area')
        .where('hotelid','=',hotelid)
    }
    public async hIdAsc() {
        return Hotel.query().orderBy("hotelid", "asc")
    }
    public async hIdDesc() {
        return Hotel.query().orderBy("hotelid", "desc")
    }
    public async cIdAsc() {
        return Hotel.query().orderBy("customerid", "asc")
    }
    public async cIdDesc() {
        return Hotel.query().orderBy("customerid", "desc")
    }
    public async nameAsc() {
        return Hotel.query().orderBy("hotelname", "asc")
    }
    public async nameDesc() {
        return Hotel.query().orderBy("hotelname", "desc")
    }
    public async doornoAsc() {
        return Hotel.query().orderBy("doorno", "asc")
    }
    public async doornoDesc() {
        return Hotel.query().orderBy("doorno", "desc")
    }
    public async streetAsc() {
        return Hotel.query().orderBy("street", "asc")
    }
    public async streetDesc() {
        return Hotel.query().orderBy("street", "desc")
    }
    public async landmarkAsc() {
        return Hotel.query().orderBy("landmark", "asc")
    }
    public async lnadmarkDesc() {
        return Hotel.query().orderBy("landmark", "desc")
    }
    public async areaAsc() {
        return Hotel.query().orderBy("area", "asc")
    }
    public async areaDesc() {
        return Hotel.query().orderBy("area", "desc")
    }
}
