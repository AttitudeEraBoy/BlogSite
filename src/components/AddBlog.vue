<template>
  <div id="add-blog">
    <h2 v-if="!submitted">Add a new Blog Post</h2>
    <form v-if="!submitted">
      <label>Blog Title:</label>
      <input type="text" v-model.lazy="blog.title" required="required"/>
      <label>Blog Content:</label>
      <textarea v-model.lazy="blog.content" required="required"></textarea>
      <label>Topic:</label>
      <div id="checkboxes" required="required">
          <input type="checkbox" value="Politics" v-model="blog.categories"/><label>Politics</label>
          <input type="checkbox" value="History" v-model="blog.categories"/><label>History</label>
          <input type="checkbox" value="Travel" v-model="blog.categories"/><label>Travel</label>
          <input type="checkbox" value="Software" v-model="blog.categories"/><label>Software</label>
      </div>
      <label>Author:</label>
      <select v-model="blog.author" class="btn btn-primary" required="required">
          <option v-for="author in authors" :key="author">{{author}}</option>
      </select>
      <button v-on:click.prevent="post" class="btn btn-success">Add Blog</button>
    </form>
    <div v-if="submitted">
        <h3>Thanks for adding your post.</h3>
    </div>
    <div id="preview">
        <h3>Preview Blog</h3>
        <p>Blog title: {{blog.title}}</p>
        <p>Blog content: {{blog.content}}</p>
        <p>Blog Categories:</p>
        <ul>
            <li v-for="category in blog.categories" :key="category">{{category}}</li>
        </ul>
        <p>Author : {{blog.author}}</p>
    </div>
  </div>
</template>

<script>


export default {
  data(){
      return{
          blog:{
            title:"",
            content:"",
            categories:[],
            author: ''
        },
        authors: [
            'Faruk Nafız Çamlıbel',
            'Cengiz Özakıncı',
            'Çetin Yetkin'
        ],
        submitted: false
        
      }
  },
  methods: {
      post(){
          this.$http.post('https://proje-5648c.firebaseio.com/posts.json',this.blog)
          .then(function(data){
              console.log(data);
              this.submitted = true;
          });
      }
  }
}
</script>

<style>
#add-blog *{
    box-sizing: border-box;
}
#add-blog{
    margin: 20px auto;
    max-width: 500px;
}
label{
    display: block;
    margin: 20px 0 10px;
}
input[type="text"], textarea{
    display: block;
    width: 100%;
    padding: 8px;
}
#preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}
h3{
    margin-top: 10px;
}
#checkboxes input{
    display: inline-block;
    margin-right: 10px;
}
#checkboxes label{
    display: inline-block;
}
</style>