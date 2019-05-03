<template>
    <div id="single-blog">
        <h1>{{blog.title | first-letter-uppercase}}</h1>
        <article>{{blog.content}}</article>
        <footer><b>{{blog.author}}</b></footer>
        <ul>
            <li v-for="category in blog.categories" :key="category">{{category}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.params.id,
            blog: {}
        }
    },
    created(){
        this.$http.get('https://proje-5648c.firebaseio.com/posts/' + this.id + '.json')
        .then(function(data){
           return data.json();
        })
        .then(function(data){
            this.blog = data;
        });
    }
}
</script>

<style scoped>
 #single-blog {
     max-width: 960px;
     margin: 0 auto;
 }
 #single-blog *{
     margin-top: 10px;
 }
 h1::first-letter{
     text-transform:capitalize;
 }
</style>
