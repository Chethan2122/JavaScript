<template>
    <v-app>
        <div>
            <br />
            <h2><b>Hotel Table</b></h2>
            <br />
            <div>
                <searchElement :random='link' @searchFunc="searchElement" />
            </div>
            <div>
                <v-form refs="form">
                    <v-dialog width="600" v-model="formDialog">

                        <template v-slot:activator="{ on,attr }">
                            <v-flex text-right align-right>
                                <v-btn @click="openform" elevation='5' color="primary" v-bind="attr" v-on="on">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-flex>
                        </template>
                        <v-card text class="white">
                            <v-text-field v-model="input.hotelid" label="hotel id"></v-text-field>
                            <v-text-field v-model="input.customerid" label="customer id"></v-text-field>
                            <v-text-field v-model="input.hotelname" label="hotel Name"></v-text-field>
                            <v-text-field v-model="input.doorno" label="doorno"></v-text-field>
                            <v-text-field v-model="input.street" label="street"></v-text-field>
                            <v-text-field v-model="input.landmark" label="landmark"></v-text-field>
                            <v-text-field v-model="input.area" label="area"></v-text-field>
                            <v-btn color="blue-darken" text @click="cancel">cancel</v-btn>
                            <v-btn v-if="change" @click="addItem">
                                submit</v-btn>
                            <v-btn v-else @click="editItem">
                                save</v-btn>
                        </v-card>
                    </v-dialog>
                </v-form>
            </div>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>hotel Id
                            <button v-if="!asc" @click="sort('hotelid','asc')">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                            <button v-else @click="sort('hotelid','desc')">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                        </th>
                        <th>customer Id
                            <button v-if="!asc" @click="sort('customerid','asc')">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                            <button v-else @click="sort('customerid','desc')">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                        </th>
                        <th>hotel name
                            <button v-if="!asc" @click="sort('hotelname','asc')">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                            <button v-else @click="sort('hotelname','desc')">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                        </th>
                        <th>customer name
                            <button v-if="!asc" @click="sort('name','asc')">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                            <button v-else @click="sort('name','desc')">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                        </th>
                        <th>address</th>
                        <th>edit/delete</th>
                    </tr>
                </thead>
                <tr v-for="(item) in hotel" :key="item.hotelid">
                    <td>{{item.hotelid}}</td>
                    <td>{{item.customerid}}</td>
                    <td>{{item.hotelname}}</td>
                    <td>{{item.customername}}</td>
                    <td>{{"D.no:"+item.address.doorno + ", " + item.address.street + ", " +item.address.landmark + ", "
                    +
                    item.address.area}}</td>
                    <td>
                        <v-btn @click="edit(item)" color="transparent" fab small elevation="0">
                            <v-icon small color="green">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn @click="remove(item.hotelid)" color="transparent" fab small elevation="0">
                            <v-icon small color="red">mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </v-simple-table>
        </div>
    </v-app>
</template>
<script>
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios'; Vue.use(VueAxios, axios)
export default {

    data() {
        return {
            middleware: {
                headers: {
                    appKey: 'z6-3_eb8wPfwFV8AHf9xchn21TLmA_w9',
                    auth:'abcd'
                }
            },
            hotelAddress: [],
            editform: {},
            input: {
                hotelid: '',
                customerid: '',
                hotelname: '',
                doorno: '',
                street: '',
                landmark: '',
                area: '',
                asc: false
            },
            change: true,
            hotel: [],
            formDialog: false,
            val: '',
            link: 'http://127.0.0.1:3333/hotel/search',


        }
    },
    mounted() {
        this.read()
    },
    methods: {
        openform() {
            this.change = true
            this.resetform()
        },
        read() {
            Vue.axios.get('http://127.0.0.1:3333/hotel/address/', this.middleware)
                .then((res) => {
                    this.hotel = (res.data)
                    console.log(res)
                })
        },
        addItem() {
            console.log('post'),
                Vue.axios.post('http://127.0.0.1:3333/hotel/create/',
                    {
                        hotelid: this.input.hotelid,
                        customerid: this.input.customerid,
                        hotelname: this.input.hotelname,
                        doorno: this.input.doorno,
                        street: this.input.street,
                        landmark: this.input.landmark,
                        area: this.input.area
                    },
                    this.middleware)
            this.formDialog = false
            this.read()
            this.resetform()
            this.$refs.forms.reset()

        },
        remove(hotelid) {
            Vue.axios.delete(`http://127.0.0.1:3333/hotel/delete/${hotelid}`, this.middleware)
            this.read()
        },
        edit(item) {
            this.change = false
            this.formDialog = true
            this.editform = item
            this.input.hotelid = item.hotelid
            this.input.customerid = item.customerid
            this.input.hotelname = item.hotelname
            this.input.doorno = item.address.doorno
            this.input.street = item.address.street
            this.input.landmark = item.address.landmark
            this.input.area = item.address.area
        },
        editItem() {
            let test = this.hotel.findIndex(temp => temp.id == this.editform.id)
            this.hotel[test].hotelid = this.input.hotelid
            this.hotel[test].customerid = this.input.customerid
            this.hotel[test].hotelname = this.input.hotelname
            this.hotel[test].doorno = this.input.address.doorno
            this.hotel[test].street = this.input.address.street
            this.hotel[test].landmark = this.input.address.landmark
            this.hotel[test].area = this.input.address.area
            this.formDialog = false
            this.change = true
            Vue.axios.patch('http://127.0.0.1:3333/hotel/update/', {
                hotelid: this.input.hotelid,
                customerid: this.input.customerid,
                hotelname: this.input.hotelname,
                doorno: this.input.doorno,
                street: this.input.street,
                landmark: this.input.landmark,
                area: this.input.area

            },
                this.middleware)
            this.read()
            this.resetform()
            this.$refs.forms.reset()
        },
        resetform() {
            this.input = {}
        },
        cancel() {
            this.formDialog = false
            this.chage = true
            this.resetform()
            this.read()
        },
        searchElement(value) {
            this.hotel = value.data
            console.log(value.data)
        },
        sort(sortBy, ascDesc) {
            const val = {
                sortBy: sortBy,
                ascDesc: ascDesc
            }
            Vue.axios.post('http://127.0.0.1:3333/hotel/sortBy', val, this.middleware)
                .then((res) => {
                    this.hotel = (res.data)
                    console.log(res)

                })
            if (ascDesc == "asc") {
                this.asc = true
            }
            else this.asc = false
        }
    }
}

</script>