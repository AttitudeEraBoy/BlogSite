import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Routes from './routes';
import Vuetify from 'vuetify';
import VuetifyConfirm from 'vuetify-confirm';
import BootstrapVue from 'bootstrap-vue';
import PortalVue from 'portal-vue';

Vue.use(PortalVue);
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(VuetifyConfirm);
//Vue Resource
Vue.use(VueResource);
//Router
Vue.use(VueRouter);

// Adding routes
const router = new VueRouter({
      routes: Routes,
      mode:'history'
});

// Custom directives
Vue.directive('rainbow',{
  bind(el,binding,vnode){
    //Gives random color to the title attribute
   el.style.color = "#" + Math.random().toString().slice(2,8);  
  }
})

Vue.directive('theme',{
  bind(el,binding,vnode){
        if(binding.value == 'wide'){
          el.style.maxWidth = "1200px";
        }
        else if(binding.value == 'narrow'){
          el.style.maxWidth = "550px";
        }
        if(binding.arg == 'column'){
          //Changes the respected values according to their arguments
         el.style.background = '#ddd';
         el.style.padding = '20px';
        }
  }
})
//Filters
Vue.filter('to-uppercase',function(value){
    return value.toUpperCase();
})

Vue.filter('snippet',function(value){
  return value.slice(0,100) + '...';
})

Vue.filter('first-letter-uppercase',function(value){
  var splitStr = value.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join(' '); 
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
