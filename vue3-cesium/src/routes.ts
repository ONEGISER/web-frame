import Home from './page/Home.vue';
import Login from './page/login/entry/Entry.vue';
import Viewer from './page/viewer/Viewer.vue';


export const routes = [
    { path: '/', component: Home },
    { path: '/viewer', component: Viewer },
    { path: '/login', component: Login }
]