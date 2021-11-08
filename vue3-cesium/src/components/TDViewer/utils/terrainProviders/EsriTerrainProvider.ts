import { ArcGISTiledElevationTerrainProvider } from "cesium"

export interface EsriTerrainProviderOption {
    url?: string
}


export enum EsriTerrainProviderUrl {
    topo = "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/TopoBathy3D/ImageServer",
    _3d = 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'
}
/**
 * ESRI地形
 * created by onegiser at 2021-08-01
 */
export class EsriTerrainProvider {
    constructor(option?: EsriTerrainProviderOption) {
        return this.init(option) as any
    }
    init(option?: EsriTerrainProviderOption) {
        return new ArcGISTiledElevationTerrainProvider({
            url: (option?.url) ? option.url : EsriTerrainProviderUrl._3d
        })
    }
}