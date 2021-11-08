import { Color, Viewer } from "cesium";
export class BaseViewer {
    viewer: Viewer
    constructor(ref: Element, option: Viewer.ConstructorOptions) {
        const defaultOptions: Viewer.ConstructorOptions = {
            animation: false,
            timeline: false,
            homeButton: false,
            geocoder: false,
        }

        const options = option ? { ...defaultOptions, ...option } : defaultOptions

        const viewer = new Viewer(ref, options)
        this.viewer = viewer
    }

    cancleSwitchAnimation() {
        if (this.viewer)
            this.viewer.sceneModePicker.viewModel.duration = 0.0;//去掉二三维切换动画效果
    }

    hideLogo() {
        const { viewer } = this
        viewer.cesiumWidget.creditContainer.innerHTML = ""
    }

    changeSceneBgTransparent() {
        const { viewer } = this
        viewer.scene.backgroundColor = Color.TRANSPARENT;
        viewer.scene.globe.baseColor = Color.TRANSPARENT;
    }

    changeProviderViewModelTitle() {
        const className = "cesium-baseLayerPicker-sectionTitle"
        const elements = document.getElementsByClassName(className)
        if (elements) {
            for (const i in elements) {
                const item = elements[i];
                if (item && item.innerHTML === "Terrain") {
                    item.innerHTML = "地形切换";
                } else {
                    if (item.innerHTML) {
                        item.innerHTML = "底图切换";
                    }
                }
            }
        }
    }
}