//原始
// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from "./routes"
Vue.use(VueRouter);

const router = new VueRouter({ routes })
Vue.config.productionTip = false

new Vue({
  el:"#app",
  router,
  render: h => h(App)
})