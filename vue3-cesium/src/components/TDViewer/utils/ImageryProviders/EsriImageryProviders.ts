import { ArcGisMapServerImageryProvider } from "cesium"

export interface EsriImageryProviderOption {
    url?: string | EsriImageryProviderUrl
}
export enum EsriImageryProviderUrl {
    baseTerrain = "https://elevation3d.arcgis.com/arcgis/rest/services/World_Terrain_Base/MapServer",
    img = "https://elevation3d.arcgis.com/arcgis/rest/services/World_Imagery/MapServer",
    terrain = "https://elevation3d.arcgis.com/arcgis/rest/services/World_Physical_Map/MapServer",
    street = "https://elevation3d.arcgis.com/arcgis/rest/services/World_Street_Map/MapServer",
    natGeo = "https://elevation3d.arcgis.com/arcgis/rest/services/NatGeo_World_Map/MapServer",
    shaded = "https://elevation3d.arcgis.com/arcgis/rest/services/World_Shaded_Relief/MapServer",
    topoMap = "https://elevation3d.arcgis.com/arcgis/rest/services/World_Topo_Map/MapServer",
    dark_shade = "https://elevation3d.arcgis.com/arcgis/rest/services/Elevation/World_Hillshade_Dark/MapServer",
    shade = "https://elevation3d.arcgis.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer",
    ocean = "https://elevation3d.arcgis.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer",
    ocean_label = "https://elevation3d.arcgis.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer",
    delorme = "https://elevation3d.arcgis.com/arcgis/rest/services/Specialty/DeLorme_World_Base_Map/MapServer",
    charts = "https://elevation3d.arcgis.com/arcgis/rest/services/Specialty/World_Navigation_Charts/MapServer"
}
export class EsriImageryProviders {
    constructor(option?: EsriImageryProviderOption) {
        return this.init(option) as any
    }
    init(option?: EsriImageryProviderOption) {
        const layer = new ArcGisMapServerImageryProvider({
            url: (option?.url) ? option.url : EsriImageryProviderUrl.img//"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
        })
        return layer
    }
}