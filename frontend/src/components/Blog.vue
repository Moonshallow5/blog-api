<template>

<v-container>
    <v-row>
        <v-col class="d-flex justify-start">
            <v-btn color="primary" @click=" this.$router.replace('/')"  >Logout</v-btn>
    </v-col>

    <v-col class="d-flex justify-end">
            <v-btn color="primary"  @click="showModal = true">Add Post</v-btn>
    </v-col>
        </v-row>
    <v-dialog  v-model="showModal" persistent max-width="400px">
        <v-card>

            <v-card-title class="d-flex">

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
    

    <h2 class="mt-7">Your Blog Posts</h2>
    <v-row>
   
      <v-col v-for="post in posts" :key="post.id">
        <v-card>
            <v-card-title>
            {{ post.title }} 
        </v-card-title>

        <v-card-subtitle>

            {{ post.content }}

        </v-card-subtitle>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              v-if="post.user_id == loggedInUserId" 
              color="red" 
              @click="deletePost(post.id)"
            >
              Delete
            </v-btn>
          </v-card-actions>

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
            loggedInUserId: null, // Store the user's ID


         };

    },
    mounted(){
        this.loggedInUserId = localStorage.getItem("user_id");
        this.loadPosts();
         // Assuming you store user_id in localStorage
       

    },
    methods:{
        closeModal(){
            this.showModal = false;
        this.title = "";
        this.content = "";

        },
        async deletePost(postId) {
            console.log('post',postId)
            const userId = this.loggedInUserId

        
      try {
        await axios.delete(`https://blog-api-web-07jr.onrender.com/delete-post/${postId}?user_id=${userId}`);
        this.loadPosts(); // Refresh the posts after deletion
      } catch (error) {
        console.error("Error deleting post:", error);
      }
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