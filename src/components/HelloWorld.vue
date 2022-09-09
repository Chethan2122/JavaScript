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
       v-model="name"
       :rules="nameRules"
       label="Name"
       required
     ></v-text-field>
     <v-text-field
       v-model="email"
       :rules="emailRules"
       label="Email"
       required
     ></v-text-field>
     <v-text-field
       v-model="mobilenumber"
       :rules="numberRules"
       label="Mobile Number"
       required
     ></v-text-field>
     <v-autocomplete
       v-model="select"
       :items="location"
       :rules="[v => !!v || 'Location is required']"
       label="Location"
       required
     ></v-autocomplete>
     <br>
     <h3>Gender</h3>
     <v-radio-group
     v-model="gender"
     column
     >
     <v-radio
     label="male"
     value="male"
     ></v-radio>
     <v-radio
     label="female"
     value="female"
     ></v-radio>
     <v-radio
     label="other"
     value="other"
     ></v-radio>
</v-radio-group>
   <h3>Interests</h3>
      <v-checkbox
     v-model="Interests"
       v-for="(interest) in choice"
       :key="interest.id"
       :label="interest.name"
       :value="interest.name"
       required
     ></v-checkbox>
     <v-text-field
       v-model="otherinterests"
       label="Mention if others"
     ></v-text-field>
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
    <template>
    <thead>
    <tr>
      <th>id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Mobile Number</th>
      <th>Location</th>
      <th>Gender</th>
      <th>Interests Mentioned</th>
      <th>Other Interests</th>
      <th>update/delete</th>
    </tr>
    </thead>
    <tr
      v-for = "(item,i) in arr"
      :key="i">
      <td>{{item.id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.email}}</td>
      <td>{{item.mobilenumber}}</td>
      <td>{{item.select}}</td>
      <td>{{item.gender}}</td>
      <td>{{item.interests}}</td>
      <td>{{item.otherinterests}}</td>
      <td>
        <v-btn  @click="editrow(item)"><v-icon small>mdi-pencil</v-icon></v-btn>
        <v-btn @click="removerow(item)"><v-icon small>mdi-delete</v-icon></v-btn>
      </td>
    </tr>
    </template>
   </v-simple-table>
   <v-dialog
   v-model = 'removeitem' max-width="400px">
   <v-card>
            <v-card-title>Do you want to delete the item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="cancel">cancel</v-btn>
              <v-btn color="red" text @click="remove">remove</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
   </v-dialog>  
    </v-app>
</template><script>
export default {
     data: () => ({
      valform:{},
       valid: true,
       name: '',
       id:0,
       nameRules: [
         name=>!!name||'Name is required',
         v => /^[a-zA-Z]+$/.test(v) || 'Name must be valid'
       ],
       email: '',
       emailRules: [
         email => !!email || 'E-mail is required',
         v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
       ],
       mobilenumber: '',
       numberRules: [
         mobilenumber=>!!mobilenumber||'Number is required',
         v => /^[0-9]+$/.test(v) || 'Number must be valid'
       ],
       select: null,
       location: [
       'Chennai',
          'Mumbai',
          'Banglore',
          'Hyderabad',
          'Delhi',
          'Kolkata',
          'Pune'
       ],
       choice: [
      {id :1,name:'music'},{id:2,name:'photography'},{id:3,name:'sports'},{id:4,name:'others'}],
      Interests:[],
      arr:[],
      editIndex:-1,
      removeitem:false,
      add:false,
      editform:true
     }),
     methods: {
       validate () {
        const arr = this.arr
         if(this.$refs.form.validate()){
          this.id++
          this.arr.push({
            id : this.id,
           name : this.name,
           email : this.email,
           mobilenumber : this.mobilenumber,
           select: this.select,
           gender :this.gender,
           interests: this.Interests,
           otherinterests : this.otherinterests         
          })}
          this.resetform()
          this.Add = false
          this.$refs.form.reset()
          
         console.log(JSON.stringify(arr))
         this.editform=true
       },
       editrow(item){
        this.editform=false
        this.Add = true
        this.valform=item
        this.name=item.name
        this.email=item.email
        this.mobilenumber=item.mobilenumber
        this.select=item.select
        this.gender=item.gender
        this.Interests=item.interests
        this.otherinterests=item.otherinterests
       },
       removerow(item){
        this.editIndex = this.arr.indexOf(item)
        this.editItem = Object.assign({}, item)
        this.removeitem=true          
       },
       remove(){
        this.arr.splice(this.editIndex,1)
        this.removeitem=false
       },
       cancel(){
        this.removeitem=false
      },
      save(){
        let test = this.arr.findIndex(temp => temp.id == this.valform.id)
         this.arr[test].name = this.name
        this.arr[test].email = this.email
        this.arr[test].mobilenumber = this.mobilenumber
        this.arr[test].select = this.select
        this.arr[test].gender = this.gender
        this.arr[test].interests = this.Interests
        this.arr[test].otherinterests = this.otherinterests
        this.Add=false
        this.editform=true
        this.resetform()

      },
      close(){
        this.Add=false
        this.editform=true
        this.resetform()
      },
      resetform(){
        this.name=''
        this.email=''
        this.mobilenumber=''
        this.select=''
        this.gender='' 
        this.Interests=''
        this.otherinterests=''

      },
      
  }
}
</script>