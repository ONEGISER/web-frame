import { createApp } from 'vue'
import * as VueRouter from "vue-router"
import { routes } from "./routes"
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
