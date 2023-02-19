import { createApp } from 'vue'
import * as VueRouter from "vue-router"
import { routes } from "./routes"
import './style.css'
import App from './App.vue'
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
const app = createApp(App)
app.use(router)
app.mount('#app')
