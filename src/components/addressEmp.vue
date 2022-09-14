<template>
    <v-app>
      <div>
      
      <v-form 
      refs="form">
          <v-dialog width="600"
          v-model="formDialog"
          >

      <template v-slot:activator="{ on,attr }">
        <v-flex text-right align-right>
          <v-btn
          elevation = '5'
              color="primary"
              v-bind="attr"
              v-on="on"
            >
          <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-flex>
         
          </template>
          <v-card text class="white">
          <v-text-field
              v-model="id"
              label="employee id"
          ></v-text-field>
          <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Employee Name"
          ></v-text-field>
          <v-text-field
              v-model="city"
              :rules="cityRules"
              label="city"
          ></v-text-field>    
          <v-btn color="blue-darken" text @click="cancel">cancel</v-btn>    
          <v-btn 
          v-if = "change"
          @click="addItem">
          submit</v-btn>
          <v-btn 
          v-else
          @click="editItem">
          save</v-btn>
      </v-card>
      </v-dialog>
      </v-form>
  
  </div>
        <v-simple-table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>city</th>
                    <th>edit/delete</th>
                </tr>
            </thead>
            <tr
            v-for = "(item,i) in empaddresses"
            :key = "i">
                <td>{{item.id}}</td>
                <td>{{item.name|pipes}}</td>
                <td>{{item.city}}</td>
                <td>
                  <v-btn @click="edit(item)"><v-icon small>mdi-pencil</v-icon></v-btn>
                  <v-btn @click="remove(item.id)"><v-icon small>mdi-delete</v-icon></v-btn>
              </td>
            </tr>
        </v-simple-table>
    </v-app>
  </template>
  <script>
    import Vue from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    Vue.use(VueAxios,axios)
    export default{
        name:"empAddress",
        data(){
          return {
              editform:{},
              id:'',
              name:'',
              city:'',
              change:true,
              editIndex:-1,
              empaddresses:[],
              formDialog:false,
              nameRules: [
              v => /^[a-zA-Z]+$/.test(v) || 'Name must be valid'
              ],
              cityRules: [
              v => /^[a-zA-Z]+$/.test(v) || 'Role must be valid'
              ]
             
              }
         },
         mounted(){
            Vue.axios.get('http://127.0.0.1:35811/know/')
            .then((res) => {this.empaddresses=(res.data)
            console.log(res)
            })
          },
         methods:{
          read(){
              Vue.axios.get('http://127.0.0.1:35811/know/')
              .then((res) => {this.empaddresses=(res.data)
              console.log(res)
             
  
            })
          },
          addItem(){
              console.log('post'),
              Vue.axios.post('http://127.0.0.1:35811/add/',
              {
                  id:this.id,
                  name:this.name,
                  city:this.city
              })
              this.formDialog=false
              this.read()
              this.$refs.form.reset()
              
          },
          remove(id){
              Vue.axios.delete(`http://127.0.0.1:35811/remove/${id}`)
              this.read()
          },
          edit(item){
              this.change = false
              this.formDialog = true
              this.editform = item
              this.id = item.id
              this.name = item.name
              this.city = item.city   
          },             
          editItem(){
              let test = this.empaddresses.findIndex(temp => temp.id == this.editform.id)
              this.empaddresses[test].id = this.id
              this.empaddresses[test].name = this.name
              this.empaddresses[test].city = this.city
              this.formDialog=false
              this.change=true
              Vue.axios.patch('http://127.0.0.1:35811/upgrade/',{
                  id:this.id,
                  name:this.name,
                  city:this.city                    
              })
              this.read()
              this.resetform()
              this.$refs.forms.reset()  
          },
          resetform(){
              this.id=''
              this.name=''
              this.city=''
          },
          cancel(){
              this.formDialog=false
              this.chage=true
              this.resetform()
              this.read()
          }
      }
  }
    
  </script>