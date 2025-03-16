<template>

    
<v-container style="text-align: center;">
    

    <h2>Register Page</h2>
    <v-row class="mt-7">
        <v-col>
            <v-text-field v-model="username" placeholder="Enter username" />
            <v-text-field v-model="password" placeholder="Enter password" />
    <v-btn @click="registerUser">Register</v-btn>
        </v-col>
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
        async registerUser(){
            try {
        const response = await axios.post("https://blog-api-web-07jr.onrender.com/register", {
            username: this.username,
            password: this.password
        });

        alert("Registration successful! You can now log in.");
        this.$router.replace("/"); // Redirect to login page
    } catch (error) {
        console.error("Error registering user:", error);
        alert(error.response.data.message);
    }
        }
    }
}


</script>