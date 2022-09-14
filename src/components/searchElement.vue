<template>
    <v-container>
        <v-text-field v-model="searchElement" placeholder="search"></v-text-field>
        <v-btn @click="search()">search</v-btn>
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    name: "searchElement",
    data() {
        return {

        }
    },
    methods: {
        async search() {
            await axios.post('http://127.0.0.1:35811/search', {
                val: this.searchElement
            }).then((response) => {
                this.$emit('searchFunc', response)
            })
        }
    }

}
</script>
