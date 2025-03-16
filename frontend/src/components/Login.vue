<template>

<v-container style="text-align: center;">
    <v-row>
        <v-col>

            <v-btn @click="registerUser">Register</v-btn>
        </v-col>
    </v-row>

    <h2>Login Page</h2>
    <v-row class="mt-7">
        <v-col>
            <v-text-field v-model="username" placeholder="Enter username" />
            <v-text-field v-model="password" placeholder="Enter password" />
    <v-btn @click="loginUser">Login</v-btn>
        </v-col>
    </v-row>
    
</v-container>

</template>

<script>
import axios from "axios";

export default{
    

    name:'Login',
    data(){
        return{
            username:"",
            password:"",
        }
    },

    methods:{
        async registerUser() {
            
                this.$router.replace("/register"); // Redirect to login page
            } ,
        

        async loginUser(){
            try {
                console.log(this.username)
                const response = await axios.post("https://blog-api-web-07jr.onrender.com/login", { 
                    username: this.username,
                    password:this.password,

                });
                console.log('hiii',response.data)
                this.token = response.data.token;
                localStorage.setItem("token", this.token);
                localStorage.setItem("username", this.username); // Fix here ✅
                localStorage.setItem("user_id", response.data.user_id);  // ✅ Store user_id 
                alert("Login successful!");
                this.$router.replace('/posts')
            } catch (error) {
                console.log('smth happened')
            }
        }
    }
}


</script>