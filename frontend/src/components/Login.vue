<template>

<v-container >
   
    <h2 class="text-h5 mb-5 poppins">Login Page</h2>
<hr />
    <v-row justify="end" class="mt-5">
        

        <v-btn @click="registerUser">Register</v-btn>
   
</v-row>

    <v-row class="mt-7">
        <v-col>
            <v-text-field v-model="username" placeholder="Enter username" />
            <v-text-field v-model="password" type="password" @keyup.enter="loginUser" placeholder="Enter password" />
    <v-btn class="mt-3" @click="loginUser"  :loading="loading['login_user']">Login</v-btn>
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
            loading:{login_user:false},
        }
    },

    methods:{
        async registerUser() {
            
                this.$router.replace("/register"); // Redirect to login page
            } ,
        

        async loginUser(){
            try {
                console.log(this.username)
                this.loading['login_user']=true
                const response = await axios.post("https://blog-api-web-07jr.onrender.com/auth/login", { 
                    username: this.username,
                    password:this.password,

                });
                console.log('hiii',response.data)
                this.token = response.data.token;
                localStorage.setItem("token", this.token);
                localStorage.setItem("username", this.username); // Fix here ✅
                localStorage.setItem("user_id", response.data.user_id);  // ✅ Store user_id 

                this.loading['login_user']=false
                this.$router.replace('/posts')
            } catch (error) {
                console.log('smth happened')
            }
        }
    }
}


</script>