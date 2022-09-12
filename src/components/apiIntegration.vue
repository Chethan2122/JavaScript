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
            v-model="empname"
            label="Employee Name"
        ></v-text-field>
        <v-text-field
            v-model="role"
            label="Role"
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
                  <th>empname</th>
                  <th>role</th>
                  <th>edit/delete</th>
              </tr>
          </thead>
          <tr
          v-for = "(item,i) in employees"
          :key = "i">
              <td>{{item.id}}</td>
              <td>{{item.empname|pipes}}</td>
              <td>{{item.role}}</td>
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
      data(){
        return {
            editform:{},
            id:'',
            empname:'',
            change:true,
            role:'',
            editIndex:-1,
            employees:[],
            formDialog:false,
           
            }
       },
       mounted(){
          Vue.axios.get('http://127.0.0.1:35811/read/')
          .then((res) => {this.employees=(res.data)
          console.log(res)
          })
        },
       methods:{
        read(){
            Vue.axios.get('http://127.0.0.1:35811/read/')
            .then((res) => {this.employees=(res.data)
            console.log(res)
           

          })
        },
        addItem(){
            console.log('post'),
            Vue.axios.post('http://127.0.0.1:35811/create/',
            {
                id:this.id,
                empname:this.empname,
                role:this.role
            })
            this.formDialog=false
            this.read()
            this.$refs.form.reset()
            
        },
        remove(id){
            Vue.axios.delete(`http://127.0.0.1:35811/delete/${id}`)
            this.read()
        },
        edit(item){
            this.change = false
            this.formDialog = true
            this.editform = item
            this.id = item.id
            this.empname = item.empname
            this.role = item.role   
        },             
        editItem(){
            let test = this.employees.findIndex(temp => temp.id == this.editform.id)
            this.employees[test].id = this.id
            this.employees[test].empname = this.empname
            this.employees[test].role = this.role
            this.formDialog=false
            this.change=true
            Vue.axios.patch('http://127.0.0.1:35811/update/',{
                id:this.id,
                empname:this.empname,
                role:this.role                    
            })
            this.read()
            this.resetform()
            this.$refs.forms.reset()  
        },
        resetform(){
            this.id=''
            this.empname=''
            this.role=''
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