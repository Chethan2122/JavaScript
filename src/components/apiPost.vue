<template>
    <div>
    <form @submit="postForm" method="post">
        <input type="text" name="id" v-model="posts.id">
        <input type="text" name="empname" v-model="posts.empname">
        <input type="text" name="role" v-model="posts.role">
        <button type="submit">submit</button>
        </form>
    </div>
</template>
<script>
    import Vue from "vue"
    import axios from"axios"
    import VueAxios from "vue-axios"
    Vue.use(VueAxios,axios)
    export default{
        name:"apiPost",
        data(){
            return {
                posts:{
                    id:null,
                    empname:null,
                    role:null
                }
            }
        },
        methods:{
            postForm(e){
                Vue.axios.post('http://127.0.0.1:35811/create',this.posts),
                console.warn(this.posts)
                e.preventDefault();
                
            }
        },
    }
</script>