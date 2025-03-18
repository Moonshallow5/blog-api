<template>
<v-container>
    <h3 class="text-h5 mb-5 poppins" >
        {{ editMode ? "Update Post" : "Add a Post" }}</h3>
            <hr />

        <v-text-field class="mt-3"   v-model="title" placeholder="Enter title" />
        <v-textarea v-model="content" placeholder="Enter content"></v-textarea>
        <v-card-actions>
            <v-btn color="blue darken-1" text @click="closeModal">Cancel</v-btn>
            <v-btn v-if="editMode!=true" @click="addPost">Post</v-btn>
            <v-btn v-if="editMode==true" @click="savePost">Save</v-btn>
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
            editMode:false,
            postId:null,
        }
    },
    mounted(){
        this.loggedInUserId = localStorage.getItem("user_id");
        if(this.$route.query.editmode){
            this.editMode=true;
            this.postId=this.$route.query.id;
            this.title=this.$route.query.title;
            this.content=this.$route.query.content
        }
    },
    methods:{
        async savePost(){
           
                await axios.put(`https://blog-api-web-07jr.onrender.com/posts/update/${this.postId}`, {
                title: this.title,
                content: this.content
            });
            this.$router.replace('/posts');
            
        },
        async addPost() {
            const userId = this.loggedInUserId
            await axios.post("https://blog-api-web-07jr.onrender.com/posts/add-post", {
                userId,
                title: this.title,
                content: this.content,
            });
            this.$router.replace('/posts');
        },
       
        closeModal(){
            this.$router.push('/posts')
        }
    }
}

</script>