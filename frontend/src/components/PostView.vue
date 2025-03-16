<template>

    <v-container>
        <v-btn @click="$router.push('/')">⬅ Back</v-btn>

        <v-card class="mt-5">
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-text>{{ post.content }}</v-card-text>
    </v-card>

    <h3 class="mt-5">Comments</h3>
    <v-card v-for="comment in comments" :key="comment.id" class="mt-2">
      <v-card-text>
        <strong>{{ comment.username }}</strong>: {{ comment.content }}
      </v-card-text>
    </v-card>

    <v-textarea v-model="newComment" label="Write a comment..." rows="2"></v-textarea>
    <v-btn @click="addComment">Post Comment</v-btn>
    </v-container>

</template>

<script>
import axios from "axios";


export default{
    name:"post-view",
    data(){
        return{
            post:{},
            comments:[],
            newComment: "",

             

        }
    },

    async mounted(){

        const postId=this.$route.params.id;
        await this.loadPost(postId);
        await this.loadComments(postId);

    },
    methods:{
    async loadPost(postId) {
      const response = await axios.get(`https://blog-api-web-07jr.onrender.com/post/${postId}`);
      this.post = response.data;
    },
    

    async addComment(postId){
        const userId=localStorage.getItem('user_id')
        if (!userId) {
            alert("You must be logged in to comment.");
            return;
        }
        await axios.post("https://blog-api-web-07jr.onrender.com/add-comment",{

            userId,
            postId:this.$route.params.id,
            content:this.newComment
        })
        this.newComment = ""; // Clear input
      this.loadComments(this.$route.params.id); // Refresh comments
    },

    async loadComments(postId){
        const response=await axios.get(`https://blog-api-web-07jr.onrender.com/comments/${postId}`);
        this.comments=response.data
    }
}

}

</script>

<style scoped>

</style>