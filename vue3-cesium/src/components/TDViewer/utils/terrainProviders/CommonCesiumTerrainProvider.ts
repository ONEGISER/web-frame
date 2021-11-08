import { CesiumTerrainProvider } from "cesium"

export interface CesiumTerrainProviderOption {
    url?: string
}
/**
 * Cesium地形,
 * created by onegiser at 2021-08-01
 */
export class CommonCesiumTerrainProvider {
    constructor(option?: CesiumTerrainProviderOption) {
        return this.init(option) as any
    }
    init(option?: CesiumTerrainProviderOption) {
        return new CesiumTerrainProvider({
            url: (option?.url) ? option.url : 'http://data.marsgis.cn/terrain',//此地址在超图API中无法使用
        })
    }
}