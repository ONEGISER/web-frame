import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { registerComponents } from './registerComponents'
const router = createRouter({
    history: createWebHistory(),
    routes,
})
const app = createApp(App)
app.use(router)
registerComponents(app)

app.mount('#app');