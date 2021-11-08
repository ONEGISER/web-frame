import { buildModuleUrl, TileMapServiceImageryProvider } from "cesium";

export class CesiumDefaultImageryProvider {
    constructor() {
        return new TileMapServiceImageryProvider({ url: buildModuleUrl('/Cesium/Assets/Textures/NaturalEarthII') })
    }
}