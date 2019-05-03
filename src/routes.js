import showBlogs from './components/showBlogs.vue';
import AddBlog from './components/AddBlog.vue';
import singleBlog from './components/singleBlog.vue';

export default[
    {path:'/',component:showBlogs},
    {path: '/add',component:AddBlog,},
    {path:'/blog/:id',component: singleBlog}
]