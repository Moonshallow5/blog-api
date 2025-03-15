<template>

<v-container>
    <v-btn color="primary" @click="showModal = true">Add Post</v-btn>
    <v-dialog v-model="showModal" persistent max-width="400px">
        <v-card>

            <v-card-title>

                <span class="text-h5">Add a New Post</span>
            </v-card-title>
        </v-card>
        <v-card-text>


        <v-text-field v-model="title" placeholder="Enter title" />
        <v-textarea v-model="content" placeholder="Enter content"></v-textarea>
        <v-card-actions>
            <v-btn color="blue darken-1" text @click="closeModal">Cancel</v-btn>
            <v-btn @click="addPost">Post</v-btn>
        </v-card-actions>
    </v-card-text>
    </v-dialog>

    <h2>Your Blog Posts</h2>
    <v-row>
   
      <v-col v-for="post in posts" :key="post.id">
        <v-card>
            <v-card-title>
            {{ post.title }}
        </v-card-title>

        <v-card-subtitle>

            {{ post.content }}

        </v-card-subtitle>

        </v-card>
      </v-col>
    </v-row>
    
  </v-container>

</template>

<script>
import axios from 'axios';

export default{
    name:"Blog",
    data() {
        return { 
            title: "", content: "", posts: [],
            showModal:false,

         };

    },
    mounted(){
        this.loadPosts()
    },
    methods:{
        closeModal(){
            this.showModal = false;
        this.title = "";
        this.content = "";

        },
        async addPost() {
            const username = localStorage.getItem("username");
            console.log('yo',username)
            console.log('yo',this.title)
            await axios.post("https://blog-api-web-07jr.onrender.com/add-post", {
                username,
                title: this.title,
                content: this.content,
            });
            this.closeModal()
            this.loadPosts();
        },
        async loadPosts() {
        const username = localStorage.getItem("username");
        const response = await axios.get(`https://blog-api-web-07jr.onrender.com/posts/${username}`);
        this.posts = response.data;
        },
    }

}


</script>