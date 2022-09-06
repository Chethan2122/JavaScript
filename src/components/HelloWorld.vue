<template>
  <v-form>
    <v-text-field
      v-model="firstname"
      label="firstname"
      placeholder="firstname"
      :rules="firstnamerule"
      required
      >
    </v-text-field>
    <v-text-field
      v-model="lastname"
      label="lastname"
      placeholder="lastname"
      :rules="lastnamerule"
      required
      >
    </v-text-field>
    <v-text-field
      v-model="email"
      label="email"
      placeholder="email"
      :rules="emailrule"
      required
    >
    </v-text-field>
    <v-text-field
      v-model="mobilenumber"
      label="mobilenumber"
      placeholder="mobilenumber"
      :rules="numberrule"
      required
      >
    </v-text-field>
    <v-select
      v-model="city"
      :items="item"
      dense
      :rules="[v => !!v || 'Item is required']"
      label="City"
      placeholder="select city"
      required
    ></v-select>
    <h3>Gender</h3>
    <v-radio-group
      v-model="radio"
      column
    >
    <v-radio
      label="male"
      value="primary"
    ></v-radio>
    <v-radio
      label="female"
      value="secondary"
    ></v-radio>
    <v-radio
      label="Other"
      value="tertiary"
    ></v-radio>
    </v-radio-group>
    <h3>Interests</h3>
    <v-checkbox
      v-model="Select"
      label="Photography"
      Value="Photography"
      ></v-checkbox>
    <v-checkbox
      v-model="Select"
      label="Travelling"
      Value="Travelling"
      ></v-checkbox>
    <v-checkbox
      v-model="Select"
      label="Music"
      Value="Music"
    ></v-checkbox>
    <v-checkbox
      v-model="select"
      label="None"
      value="None"
    ></v-checkbox>
    <v-btn
     :disabled="!valid"
      color="black"
      @click="validate"
    >
    Validate
    </v-btn>
    
  
  
  </v-form>
  </template>
  <script>
    export default {
      data:() => ({
        valid : true,
        firstname : "",
        firstnamerule:[
          firstname => !!firstname||'Name is required'
        ],
        lastname : "",
        lastnamerule:[
          lastname => !!lastname||'Name is required'
        ],
        Email : "",
        emailrule:[
          email => !!email||'Email is required'
        ],
        mobilenumber : "",
        numberrule:[
          mobilenumber => !!mobilenumber||'Email is required'
        ],
        select : null,
        item:[
          'Chennai',
          'Mumbai',
          'Banglore',
          'Hyderabad',
          'Delhi',
          'Kolkata',
          'Pune'
          ],
          city:"",
          
    }),
    methods :{
      validate () {
        this.$refs.form.validate()
      const arr = {
        firstname : this.firstname,
        lastname : this.lastname,
        email : this.email,
        gender :this.gender,
        mobilenumber :this.mobilenumber,
        checkbox: this.checkbox,
        selected: this.city,
        row: this.row
      }
      console.log(JSON.stringify(arr))
      }
    }
  }
    
  </script>
  <style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  nav {
    padding: 30px;
  
    a {
      font-weight: bold;
      color: #2c3e50;
  
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  </style>
  