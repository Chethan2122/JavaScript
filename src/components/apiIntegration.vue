<template>
    <v-app>
        <div>
            <br/>
            <h2><b>Employee Table</b></h2>
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
                            <v-text-field v-model="input.id" label="employee id"></v-text-field>
                            <v-text-field v-model="input.empname" :rules="nameRules" label="Employee Name">
                            </v-text-field>
                            <v-text-field v-model="input.role" :rules="roleRules" label="Role"></v-text-field>
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
                        <th>empname
                            <button v-if="nameasc" @click="nameAsc">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                            <button v-else @click="nameDesc">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                        </th>
                        <th>role
                            <button v-if="roleasc" @click="roleAsc">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </button>
                            <button v-else @click="roleDesc">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </button>
                        </th>
                        <th>edit/delete</th>
                    </tr>
                </thead>
                <tr v-for="(item,i) in employees" :key="i">
                    <td>{{item.id}}</td>
                    <td>{{item.empname|pipes}}</td>
                    <td>{{item.role|pipes}}</td>
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
import VueAxios from 'vue-axios';
import { getInfo, postInfo, editInfo, deleteInfo, getidAsc, getidDesc, getnameAsc, getnameDesc, getroleAsc, getroleDesc } from '../components/services/apiService.js'
Vue.use(VueAxios, axios)
export default {

    data() {
        return {
            editform: {},
            input: {
                id: '',
                empname: '',
                role: ''
            },
            change: true,
            editIndex: -1,
            employees: [],
            formDialog: false,
            nameRules: [
                v => /^[a-zA-Z]+$/.test(v) || 'Name must be valid'
            ],
            roleRules: [
                v => /^[a-zA-Z]+$/.test(v) || 'Role must be valid'
            ],
            val: '',
            link: 'http://127.0.0.1:35811/search',
            idasc: true,
            nameasc: true,
            roleasc: true

        }
    },
    mounted() {
        console.log(process.env.VUE_APP_SERVER_URL)
        getInfo()
            .then((res) => {
                console.log(res)
                this.employees = res
            })
    },
    methods: {
        read() {
            getInfo()
                .then((res) => {
                    console.log(res)
                    this.employees = res
                })
        },
        openform() {
            this.resetform()
            this.formDialog = true
            this.change = true
        },
        addItem() {
            console.log('post'),
                postInfo(this.input)
            this.formDialog = false
            this.read()
            this.$refs.form.reset()

        },
        edit(item) {
            this.change = false
            this.formDialog = true
            this.editform = item
            this.input = item
        },
        editItem() {
            let test = this.employees.findIndex(temp => temp.id == this.editform.id)
            this.employees[test].input = this.item
            this.formDialog = false
            this.change = true
            editInfo(this.input)
            this.read()
            this.resetform()
            this.$refs.forms.reset()
        },
        remove(id) {
            deleteInfo(id)
            this.read()
        },
        resetform() {
            this.input = {}

        },
        cancel() {
            this.change = true
            this.formDialog = false
            this.resetform()
            this.read()
        },
        searchElement(value) {
            this.employees = value.data
        },
        idDesc() {
            getidAsc()
                .then((res) => {
                    console.log(res)
                    this.employees = res
                })
            this.idasc = true
        },
        idAsc() {
            getidDesc()
                .then((res) => {
                    console.log(res)
                    this.employees = res
                })
            this.idasc = false
        },
        nameDesc() {
            getnameAsc()
                .then((res) => {
                    console.log(res)
                    this.employees = res
                })
            this.nameasc = true
        },
        nameAsc() {
            getnameDesc()
                .then((res) => {
                    console.log(res)
                    this.employees = res
                })
            this.nameasc = false
        },
        roleDesc() {
            getroleAsc()
                .then((res) => {
                    console.log(res)
                    this.employees = res
                })
            this.roleasc = true
        },
        roleAsc() {
            getroleDesc()
                .then((res) => {
                    console.log(res)
                    this.employees = res
                })
            this.roleasc = false
        }
    }
}

</script>