<template>

<div>

    <h2>Login:</h2>
    <input v-model="username" placeholder="Enter username" />
    <button @click="loginUser">Login</button>
</div>

</template>

<script>
import axios from "axios";
import Blog from "./Blog.vue";

export default{
    

    name:'Login',
    data(){
        return{
            username:"",
        }
    },

    methods:{

        async loginUser(){
            try {
                console.log(this.username)
                const response = await axios.post("http://localhost:5000/login", { username: this.username });
                this.token = response.data.token;
                localStorage.setItem("token", this.token);
                localStorage.setItem("username", this.username); // Fix here ✅
                alert("Login successful!");
                this.$router.push('/posts')
            } catch (error) {
                console.log('smth happened')
            }
        }
    }
}


</script>