<template>
    <v-app>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <v-dialog
        v-model = "add" width="600"
        >
        <template v-slot:activator="{ on,attr }">
        <v-flex text-right align-right>
        <v-btn
        elevation = '5'
        color="primary"
        v-bind="attr"
        v-on="on"
        >
          <h3><v-icon>mdi-plus</v-icon></h3>
        </v-btn>
      </v-flex>
     
      </template>
      <v-card text class="white">
     <v-text-field
       v-model="id"
       :rules="idRules"
       label="employee id"
       required
     ></v-text-field>
     <v-text-field
       v-model="empname"
       :rules="empnameRules"
       label="Employee Name"
       required
     ></v-text-field>
     <v-text-field
       v-model="role"
       :rules="roleRules"
       label="Role"
       required
     ></v-text-field>
     <br>
      <v-btn color="blue-darken" text @click="close">cancel</v-btn>
      <v-btn
      v-if="editform"
       :disabled="!valid"
       color="success"
       class="mr-4"
       @click="validate"
     >
       Validate
     </v-btn>
     <v-btn
     v-else
       :disabled="!valid"
       color="success"
       class="mr-4"
       @click="save"
     >
       Save
     </v-btn>
    </v-card>
    </v-dialog>
   </v-form>
   <v-simple-table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>empname</th>
                    <th>role</th>
                </tr>
            </thead>
            <tr
            v-for = "(item,i) in employees"
            :key = "i">
                <td>{{item.id}}</td>
                <td>{{item.empname}}</td>
                <td>{{item.role}}</td>
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
        name : 'App',
        mounted(){
            Vue.axios.get('http://127.0.0.1:35811/read')
            .then((res) => {this.employees=(res.data)
            console.log(res)
            })
        },
        data: () => ({
            return {employees:undefined},
            valform:{},
            valid: true,
            id: '',
            idRules: [
                id=>!!id||'id is required',
                v => /^[0-9]+$/.test(v) || 'id must be valid'
            ],
            empname: '',
            empnameRules: [
                empname=>!!empname||'Name is required',
                v => /^[a-zA-Z]+$/.test(v) || 'Name must be valid'
            ],
            role: '',
            roleRules: [
                role => !!role || 'E-mail is required',
                v => /^[a-zA-Z]+$/.test(v) || 'E-mail must be valid',
            ],
            arr:[]
        
       
        }),
        methods:{
            validate(){
                const arr = this.arr
                if(this.$refs.form.validate()){
                    this.arr.push({
                    id : this.id,
                    empname : this.empname,
                    role : this.role,
                    })
                }
            }
        }
    }
    
</script>