<template>

<v-container>

    <h3 class="text-h5 mb-5 poppins" >
                Blog Posts</h3>
            <hr />
    <v-row class="mt-3">
        <v-col class="d-flex justify-start">
            <v-btn color="primary" v-if="loggedInUserId" @click="logout()" >Logout</v-btn>
            <v-btn color="primary" v-if="!loggedInUserId" @click="login" >Login</v-btn>
    </v-col>

    <v-col class="d-flex justify-end">
            <v-btn color="primary" v-if="loggedInUserId"   @click="addPost">Add Post</v-btn>
    </v-col>
        </v-row>
    

    <h2 class="mt-7">Your Blog Posts</h2>
    <v-row>
   
      <v-col v-for="post in posts" :key="post.id">
        <v-card @click="$router.push(`/post/${post.id}`)">
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
            icon 
            @click.stop="editPost(post)"   
            >
            <v-icon>mdi-pencil</v-icon> 
        </v-btn>
            <v-btn 
              v-if="post.user_id == loggedInUserId" 
              color="red" 
              @click.stop="deletePost(post.id)"
              
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
            editmode:null,


         };

    },
    mounted(){
        this.loggedInUserId = localStorage.getItem("user_id"); // Initialize on mount
 
        if (!this.loggedInUserId) {
            alert('User Id not found')
        } else {
            this.loadPosts();
        }

    },
    methods:{
        logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("user_id");
           
            this.loggedInUserId = null; // Update state reactively
           

        },
        login(){
            this.$router.replace('/')
        },
        editPost(post){
            this.$router.push({
            path:'/add-post',
            query:{
                editmode:true,
                id:post.id,
                content:post.content,
                title:post.title,

            }


            });

        },
        async deletePost(postId) {
            const userId = this.loggedInUserId

                
            try {
                await axios.delete(`https://blog-api-web-07jr.onrender.com/posts/delete-post/${postId}?user_id=${userId}`);
              
            } catch (error) {
                console.error("Error deleting post:", error);
            }
            this.loadPosts()
        },
        
        async addPost() {
            this.$router.push('add-post')

        },
        async loadPosts() {
        
        const userId = this.loggedInUserId
        const response = await axios.get(`https://blog-api-web-07jr.onrender.com/posts/user/${userId}`);
        this.posts = response.data;
        },
    }

}


</script>