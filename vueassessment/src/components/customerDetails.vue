<template>
    <v-app>
        <div>
            <br />
            <h2><b>Customer Table</b></h2>
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
                            <v-text-field v-model="input.id" label="customer id"></v-text-field>
                            <v-text-field v-model="input.name" label="Customer Name">
                            </v-text-field>
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
                        <th>id
                            <button v-if="idasc" @click="idAsc">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                            <button v-else @click="idDesc">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                        </th>
                        <th>name
                            <button v-if="nameasc" @click="nameAsc">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                            <button v-else @click="nameDesc">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                        </th>
                        <th>edit/delete</th>
                    </tr>
                </thead>
                <tr v-for="(item,i) in customer" :key="i">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>
                        <v-btn @click="edit(item)" color="transparent" fab small elevation="0">
                            <v-icon small color="green">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn @click="remove(item.id)" color="transparent" fab small elevation="0">
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
                id: '',
                name: ''
            },
            change: true,
            idasc: true,
            nameasc: true,
            customer: [],
            formDialog: false,
            val:'',
            link:'http://127.0.0.1:3333/customer/search'

        }
    },
    mounted(){
          Vue.axios.get('http://127.0.0.1:3333/customer/read')
          .then((res) => {this.customer=(res.data)
          console.log(res)
          })
        },
       methods:{
        openform(){
            this.change=true
            this.resetform()
        },
        read(){
            Vue.axios.get('http://127.0.0.1:3333/customer/read/')
            .then((res) => {this.customer=(res.data)
            console.log(res)
           
          })
        },
        addItem(){
            console.log('post'),
            Vue.axios.post('http://127.0.0.1:3333/customer/create/',
            {
                id:this.input.id,
                name:this.input.name
            })
            this.formDialog=false
            this.read()
            this.resetform()
            this.$refs.forms.reset()  
            
        },
        remove(id){
            Vue.axios.delete(`http://127.0.0.1:3333/customer/delete/${id}`)
            this.read()
        },
        edit(item){
            this.change = false
            this.formDialog = true
            this.editform = item
            this.input.id = item.id
            this.input.name = item.name
        },             
        editItem(){
            let test = this.customer.findIndex(temp => temp.id == this.editform.id)
            this.customer[test].id = this.input.id
            this.customer[test].name = this.input.name
            this.formDialog=false
            this.change=true
            Vue.axios.patch('http://127.0.0.1:3333/customer/update/',{
                id:this.input.id,
                name:this.input.name                 
            })
            this.read()
            this.resetform()
            this.$refs.forms.reset()  
        },
        searchElement(value) {
            this.customer = value.data
        },
        resetform(){
            this.input.id=''
            this.input.name=''
            this.input.role=''
        },
        cancel(){
            this.formDialog=false
            this.chage=true
            this.resetform()
            this.read()
        },
        idAsc(){
            Vue.axios.get('http://127.0.0.1:3333/customer/iddesc/')
            .then((res) => {this.customer=(res.data)
            console.log(res)
            this.idasc=false
           
          })
        },
        idDesc(){
            Vue.axios.get('http://127.0.0.1:3333/customer/idasc/')
            .then((res) => {this.customer=(res.data)
            console.log(res)
            this.idasc=true
           
          })
        },
        nameAsc(){
            Vue.axios.get('http://127.0.0.1:3333/customer/namedesc/')
            .then((res) => {this.customer=(res.data)
            console.log(res)
            this.nameasc=false
           
          })
        },
        nameDesc(){
            Vue.axios.get('http://127.0.0.1:3333/customer/nameasc/')
            .then((res) => {this.customer=(res.data)
            console.log(res)
            this.nameasc=true
           
          })
        }
    }
}
  
</script>