import { Rectangle, Viewer } from "cesium"

export interface ModelOption {
    url?: string
    minimumPixelSize?: number
    show?: boolean
}
export interface FlyOptions {
    track?: boolean
    path?: {
        show?: boolean
    },
    model?: ModelOption
    name?: string
    jsonUrl?: string
    modelUrl?: string//漫游素材的url,入'./imgs/models/Cesium_Air.gltf'
    modelMinimumPixelSize?: number
    height?: number
    orientation?: Orientation
    destination?: Destination
    type?: FlyType
    multiplier?: number
    duration?: number
    viewFrom?: {
        x?: number
        y?: number
        z?: number
    }
}


export declare type FlyType = "fly" | "onfoot" | "take" | "camera" | ""

export interface Orientation {
    heading?: number
    pitch?: number
    roll?: number
}

export interface Destination {
    x?: number, y?: number, z?: number
}
export interface FlyExtent {
    xmin: number
    ymin: number
    xmax: number
    ymax: number
    duration: number
}

export const ChinaExtent = {
    xmin: 71.32483587067722,
    ymin: 21.038709010092226,
    xmax: 144.97717962067736,
    ymax: 52.239880885092276,
    duration: 3
}
export class FlyUtil {
    viewer: Viewer
    constructor(viewer: Viewer) {
        this.viewer = viewer
    }

    flyToChina() {
        const { xmin, ymin, xmax, ymax, duration } = ChinaExtent
        this.viewer.camera.flyTo({
            destination: Rectangle.fromDegrees(xmin, ymin, xmax, ymax),
            duration
        })
    }

    flyToExtent(flyExtent: FlyExtent) {
        const { xmin, ymin, xmax, ymax, duration } = flyExtent
        this.viewer.camera.flyTo({
            destination: Rectangle.fromDegrees(xmin, ymin, xmax, ymax),
            duration
        })
    }
}