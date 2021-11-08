import 'element-plus/packages/theme-chalk/src/base.scss'
import { ElButton, ElSelect, ElRow, ElForm, ElInput, ElFormItem,ElTree,ElIcon,ElCheckbox } from 'element-plus';
import { App } from 'vue';
export const registerComponents = (app: App) => {
    app.use(ElButton)
    app.use(ElSelect)
    app.use(ElRow)
    app.use(ElForm)
    app.use(ElInput)
    app.use(ElFormItem)
    app.use(ElTree)
    app.use(ElIcon)
    app.use(ElCheckbox)

}