<template>

<div>
    <h2>Create a Blog Post</h2>
    <input v-model="title" placeholder="Enter title" />
    <textarea v-model="content" placeholder="Enter content"></textarea>
    <button @click="addPost">Post</button>

    <h2>Your Blog Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }} - {{ post.content }}</li>
    </ul>
  </div>

</template>

<script>
import axios from 'axios';

export default{
    name:"Blog",
    data() {
        return { title: "", content: "", posts: [] };
    },
    mounted(){
        this.loadPosts()
    },
    methods:{
        async addPost() {
            const username = localStorage.getItem("username");
            console.log('yo',username)
            console.log('yo',this.title)
            await axios.post("https://blog-api-web-07jr.onrender.com/add-post", {
                username,
                title: this.title,
                content: this.content,
            });
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