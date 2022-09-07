<template>
  <v-app>
      <v-form
     ref="form"
     v-model="valid"
     lazy-validation
   >
     <v-text-field
       v-model="name"
       :rules="nameRules"
       label="Name"
       required
     ></v-text-field>
     <v-text-field
       v-model="email"
       :rules="emailRules"
       label="E-mail"
       required
     ></v-text-field>
     <v-text-field
       v-model="mobilenumber"
       :rules="numberRules"
       label="mobilenumber"
       required
     ></v-text-field>
     <v-select
       v-model="select"
       :items="location"
       :rules="[v => !!v || 'Location is required']"
       label="location"
       required
     ></v-select>
     <br>
     <h3>Gender</h3>
     <v-radio-group
     v-model="gender"
     column
     >
     <v-radio
     label="male"
     value="Male"
     ></v-radio>
     <v-radio
     label="female"
     value="Female"
     ></v-radio>
     <v-radio
     label="other"
     value="other"
     ></v-radio>
</v-radio-group>
   <h2>Interests</h2>
      <v-checkbox
     v-model="Interests"
       v-for="(cho) in choice"
       :key="cho.id"
       :label="cho.name"
       :value="cho.name"
       required
     ></v-checkbox>
     <v-text-field
       v-model="others"
       label="Mention if others"
     ></v-text-field>
   
      <v-btn
       :disabled="!valid"
       color="success"
       class="mr-4"
       @click="validate"
     >
       Validate
     </v-btn>
   </v-form>
    </v-app>
</template><script>
export default {
     data: () => ({
       valid: true,
       name: '',
       nameRules: [
         name=>!!name||'Name is required',
         v => /[a-zA-Z]/.test(v) || 'Name must be valid'
       ],
       email: '',
       emailRules: [
         email => !!email || 'E-mail is required',
         v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
       ],
       mobilenumber: '',
       numberRules: [
         mobilenumber=>!!mobilenumber||'Number is required',
         v => /[0-9]/.test(v) || 'Number must be valid'
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
      Interests:[]
     }),
     methods: {
       validate () {
         this.$refs.form.validate()
         const arr = {
           name : this.name,
           email : this.email,
           gender :this.gender,
           Hobbies: this.Hobbies,
           select: this.select,          }
         console.log(JSON.stringify(arr))
       }    }
}
</script>