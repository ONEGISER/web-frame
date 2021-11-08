import 'element-plus/packages/theme-chalk/src/base.scss'
import { ElButton, ElSelect } from 'element-plus';
import { App } from 'vue';
export const registerComponents = (app: App) => {
    app.use(ElButton)
    app.use(ElSelect)
}