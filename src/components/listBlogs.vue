<template>
  <div v-theme:column="'narrow'" id="show-blogs">
    <h1>List Blog Titles</h1>
    <input type="text" v-model="search" placeholder="Search blogs"/>
    <div v-for="blog in filteredBlogs" class="single-blog" :key="blog">
        <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
    </div>
  </div>
</template>

<script>
import searchMixing from '../mixings/searchMixing';

export default {
  
  data(){
    return{
       blogs: [],
       search: ''
    }
  },
  methods: {

  },
  created(){
      this.$http.get('https://jsonplaceholder.typicode.com/posts')
      .then(function(data){
           this.blogs = data.body.slice(0,10);
      });
  },
  mixins:[searchMixing]
}
</script>

<style>
#show-blogs{
    max-width: 800px;
    margin: 0 auto;
}
.single-blog{
    padding:20px;
    margin:20px 0;
    box-sizing: border-box;
    background: #eee;
}
</style>
