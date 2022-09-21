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
                            <button v-if="hidasc" @click="hIdAsc">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                            <button v-else @click="hIdDesc">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                        </th>
                        <th>customer Id
                            <button v-if="cidasc" @click="cIdAsc">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                            <button v-else @click="cIdDesc">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                        </th>
                        <th>hotel name
                            <button v-if="nameasc" @click="nameAsc">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                            <button v-else @click="nameDesc">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                        </th>
                        <th>address</th>
                        <th>edit/delete</th>
                    </tr>
                </thead>
                <tr v-for="(item,i) in hotel" :key="i">
                    <td>{{item.hotelid}}</td>
                    <td>{{item.customerid}}</td>
                    <td>{{item.hotelname}}</td>
                    <td>{{item.doorno+", "+item.street+', '+item.landmark+', '+item.area}}</td>
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
import VueAxios from 'vue-axios';Vue.use(VueAxios, axios)
export default {

    data() {
        return {
            editform: {},
            input: {
                hotelid: '',
                customerid: '',
                hotelname: '',
                doorno: '',
                street: '',
                landmark: '',
                area: ''
            },
                address:{
                doorno: '',
                street: '',
                landmark: '',
                area: ''
            },
            change: true,
            hotel: [],
            formDialog: false,
            hidasc:true,
            cidasc:true,
            nameasc:true,
            val:'',
            link:'http://127.0.0.1:3333/hotel/search'

        }
    },
    mounted(){
          Vue.axios.get('http://127.0.0.1:3333/hotel/read')
          .then((res) => {this.hotel=(res.data)
          console.log(res)
          })
        },
       methods:{
        openform(){
            this.change=true
            this.resetform()
        },
        read(){
            Vue.axios.get('http://127.0.0.1:3333/hotel/read/')
            .then((res) => {this.hotel=(res.data)
            console.log(res)
           
          })
        },
        addItem(){
            console.log('post'),
            Vue.axios.post('http://127.0.0.1:3333/hotel/create/',
            {
                hotelid:this.input.hotelid,
                customerid:this.input.customerid,
                hotelname:this.input.hotelname,
                doorno:this.input.doorno,
                street:this.input.street,
                landmark:this.input.landmark,
                area:this.input.area
            })
            this.formDialog=false
            this.read()
            this.resetform()
            this.$refs.forms.reset()  
            
        },
        remove(hotelid){
            Vue.axios.delete(`http://127.0.0.1:3333/hotel/delete/${hotelid}`)
            this.read()
        },
        edit(item){
            this.change = false
            this.formDialog = true
            this.editform = item
            this.input = item
        },             
        editItem(){
            let test = this.hotel.findIndex(temp => temp.id == this.editform.id)
            this.hotel[test].hotelid = this.input.hotelid
            this.hotel[test].customerid = this.input.customerid
            this.hotel[test].hotelname = this.input.hotelname
            this.hotel[test].doorno = this.input.doorno
            this.hotel[test].street = this.input.street
            this.hotel[test].landmark = this.input.landmark
            this.hotel[test].area = this.input.area
            this.formDialog=false
            this.change=true
            Vue.axios.patch('http://127.0.0.1:3333/hotel/update/',{
                hotelid:this.input.hotelid,
                customerid:this.input.customerid,
                hotelname:this.input.hotelname,
                doorno:this.input.doorno,
                street:this.input.street,
                landmark:this.input.landmark,
                area:this.input.area

            })
            this.read()
            this.resetform()
            this.$refs.forms.reset()  
        },
        resetform(){
            this.input={}
        },
        cancel(){
            this.formDialog=false
            this.chage=true
            this.resetform()
            this.read()
        },
        searchElement(value) {
            this.hotel = value.data
        },
        hIdAsc(){
            Vue.axios.get('http://127.0.0.1:3333/hotel/hiddesc/')
            .then((res) => {this.hotel=(res.data)
            console.log(res)
            this.hidasc=false
           
          })
        },
        hIdDesc(){
            Vue.axios.get('http://127.0.0.1:3333/hotel/hidasc/')
            .then((res) => {this.hotel=(res.data)
            console.log(res)
            this.hidasc=true
           
          })
        },
        cIdAsc(){
            Vue.axios.get('http://127.0.0.1:3333/hotel/ciddesc/')
            .then((res) => {this.hotel=(res.data)
            console.log(res)
            this.cidasc=false
           
          })
        },
        cIdDesc(){
            Vue.axios.get('http://127.0.0.1:3333/hotel/cidasc/')
            .then((res) => {this.hotel=(res.data)
            console.log(res)
            this.cidasc=true
           
          })
        },
        nameAsc(){
            Vue.axios.get('http://127.0.0.1:3333/hotel/namedesc/')
            .then((res) => {this.hotel=(res.data)
            console.log(res)
            this.nameasc=false
           
          })
        },
        nameDesc(){
            Vue.axios.get('http://127.0.0.1:3333/hotel/nameasc/')
            .then((res) => {this.hotel=(res.data)
            console.log(res)
            this.nameasc=true
           
          })
        }
    }
}
  
</script>