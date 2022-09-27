<template>
    <div>
        <v-card width="300px" color="transparent" outlined>
            <v-text-field v-model="searchElement" @keyup="search" placeholder="search" outlined label="search">
            </v-text-field>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue'
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios)
export default {
    name: "searchElement",
    data() {
        return {
            middleware: {
                headers: {
                    appKey: 'z6-3_eb8wPfwFV8AHf9xchn21TLmA_w9',
                    auth:'abcd'
                }
            },

        }
    },
    methods: {
        async search() {
            console.log(this.random)
            await Vue.axios.post(this.random, {
                val: this.searchElement
            }, this.middleware).then((response) => {
                this.$emit('searchFunc', response)
            })
        }
    },
    props: {
        random: String
    }

}
</script>
