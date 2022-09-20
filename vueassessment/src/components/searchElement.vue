<template>
    <div>
        <v-card width="300px" color="transparent" outlined>
            <v-text-field v-model="searchElement" @keyup="search" placeholder="search" outlined label="search"></v-text-field>
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

        }
    },
    methods: {
        async search() {
            console.log(this.random)
            await Vue.axios.post(this.random, {
                val: this.searchElement
            }).then((response) => {
                this.$emit('searchFunc', response)
            })
        }
    },
    props: {
        random: String
    }

}
</script>
