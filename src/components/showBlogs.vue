<template>
  <div v-theme:column="'narrow'" id="show-blogs" class="overflow-auto">
    <h1>All Blog Articles</h1>
    <input type="text" v-model="search" placeholder="Search blogs" class="fa fa-arrow-circle-right fa-lg"/>
    <div v-for="(blog,i) in filteredBlogs" class="single-blog" :key="blog" id="blogz">
        <h2><router-link v-bind:to="'/blog/'+blog.id">{{blog.title | to-uppercase}}</router-link>
        <button class="btn btn-xs pull-right margin-right-10" @click="deleteblog(blog.id,i)">
          <i class="fa fa-trash pull-right"></i>
        </button>
          </h2>
        <article>{{blog.content | snippet}}</article>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="blogz"
    ></b-pagination>
  </div>
</template>

<script>
import searchMixing from '../mixings/searchMixing';
export default {
  
  data(){
    return{
       blogs: [],
       search: '',
       perPage:3,
       currentPage:1
    }
  },
  methods: {
     async deleteblog(id,i){
        let res = await this.$confirm('Are you sure about deleting this blog?',{
          buttonTrueText: 'Delete',
          buttonFalseText: 'No',
          title: 'Deleting the blog',
          icon:null,
          color:null,
          width: 350,
          property: '$confirm',
          persistent: true
});
        if (res) {
          fetch('https://proje-5648c.firebaseio.com/posts/' + id + '.json', {
            method: "DELETE"
          })
          .then(() => {
            this.blogs.splice(i,1);
          })}
}
     },
  created(){
      this.$http.get('https://proje-5648c.firebaseio.com/posts.json')
      .then(function(data){
           return data.json();
      }).then(function(data){
        var blogsArray = [];
        for(let key in data){
           data[key].id = key;
           blogsArray.unshift(data[key]);
        }
        this.blogs = blogsArray;
      });
      
  },
  computed:{
       rows() {
        return this.blogs.length;
      }
  },
  mixins:[searchMixing]
}
</script>

<style scoped>
#show-blogs{
    max-width: 800px;
    margin: 0 auto;
}
.single-blog{
    padding:20px;
    margin:20px 0;
    box-sizing: border-box;
}
a{
  text-decoration: none !important;
  color:black;
}
a:hover{
  opacity: 0.8;
}
.margin-right-10{
  margin-right: 10px;
  float: right;
}
i:hover{
  opacity: 0.8;
}
button{
  border-style: none;
}
</style>
