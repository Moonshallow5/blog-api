<template>

    
<v-container>
    

    <h2 class="text-h5 mb-5 poppins">Register Page</h2>
    <hr />
    <v-row class="mt-7">
        <v-col>
            <v-text-field v-model="username" placeholder="Enter username" />
            <v-text-field v-model="password" type="password" @keyup.enter="registerUser" placeholder="Enter password" />
    <v-btn @click="registerUser">Register</v-btn>
        </v-col>
    </v-row>
    <v-row justify="end">
    <h5 class=" mr-5">Log in instead!</h5>

    <v-btn @click=loginUser style="min-width: 40px; height: 20px; font-size: 10px;" x-small>Login</v-btn>

</v-row>
    
</v-container>
</template>

<script>
import axios from "axios";

export default{
    name:"register",
    data(){
        return{
            username:"",
            password:"",
        }
    },
    methods:{
        async loginUser() {
            
            this.$router.replace("/"); // Redirect to login page
        } ,
        async registerUser(){
            try {
        const response = await axios.post("https://blog-api-web-07jr.onrender.com/auth/register", {
            username: this.username,
            password: this.password
        });

        alert("Registration successful! You can now log in.");
        this.$router.replace("/"); // Redirect to login page
    } catch (error) {
        console.error("Error registering user:", error);
        alert(error.response.data.message);
    }
        },
        
    }
}


</script>