<template>
<v-container>
    <h3 class="text-h5 mb-5 poppins" >
                Add a Post</h3>
            <hr />

        <v-text-field class="mt-3"   v-model="title" placeholder="Enter title" />
        <v-textarea v-model="content" placeholder="Enter content"></v-textarea>
        <v-card-actions>
            <v-btn color="blue darken-1" text @click="closeModal">Cancel</v-btn>
            <v-btn @click="addPost">Post</v-btn>
        </v-card-actions>




</v-container>


</template>

<script>
import axios from 'axios';
export default{
    name:'add_post',
    data(){
        return{
            loggedInUserId:null,
            title: "", content: "", posts: [],
        }
    },
    mounted(){
        this.loggedInUserId = localStorage.getItem("user_id");
    },
    methods:{
        async addPost() {
            const userId = this.loggedInUserId
            await axios.post("https://blog-api-web-07jr.onrender.com/add-post", {
                userId,
                title: this.title,
                content: this.content,
            });
            this.$router.push('/posts');

          
        },
       
        closeModal(){
            this.$router.push('/posts')
        }
    }
}

</script>