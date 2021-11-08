import { Command, ProviderViewModel } from "cesium"
import { EsriImageryProviders, EsriImageryProviderUrl } from "./EsriImageryProviders"
import { MapboxImageryProviders, MapboxImageryStyleProviders, StyleId } from "./MapboxImageryProviders"
import { TdtImageryProviders, TdtTypes } from "./TdtImageryProviders"
export interface ProviderViewModelOption {
    tdtKey?: string
    mapboxKey?: string
}
export class ImageryProviderViewModel {
    option?: ProviderViewModelOption
    constructor(option: ProviderViewModelOption) {
        this.option = option

    }

    all() {
        return [this.tdtImg(), this.tdtVector(), this.tdtTer(), this.esriImg(), this.mapboxStreet(), this.mapboxOutdoors(), this.mapboxLight(), this.mapboxDark(), this.mapboxImg(), this.mapboxImgStreet(), this.mapboxNavDay(), this.mapboxNavNight()] as any
    }


    tdt(name: string, tooltip: string, iconUrl: string, urls: string[]) {
        const { option } = this
        return new ProviderViewModel({
            name,
            tooltip,
            iconUrl,
            creationFunction: () => {
                const layers: any[] = []
                if (option?.tdtKey) {
                    for (const i in urls) {
                        const url = urls[i]
                        const layer = new TdtImageryProviders(option.tdtKey, { url })
                        if (layer) {
                            layers.push(layer)
                        }
                    }
                }
                return layers
            }
        })
    }

    tdtVector() {
        return this.tdt("天地图矢量", "天地图矢量", "/images/vec_c.png", [TdtTypes.VEC_BASE_GCS, TdtTypes.VEC_ANNO_GCS, TdtTypes.ibo_c])
    }

    tdtImgNoLabel() {
        return this.tdt("天地图影像(无注记)", "天地图影像(无注记)", "/images/img_c.png", [TdtTypes.IMG_BASE_GCS])
    }


    tdtImg() {
        return this.tdt("天地图影像", "天地图影像", "/images/img_c.png", [TdtTypes.IMG_BASE_GCS, TdtTypes.IMG_ANNO_GCS, TdtTypes.ibo_c])
    }


    tdtTer() {
        return this.tdt("天地图地形", "天地图地形", "/images/ter_c.png", [TdtTypes.TER_BASE_GCS, TdtTypes.TER_ANNO_GCS, TdtTypes.ibo_c])
    }

    esri(name: string, tooltip: string, iconUrl: string, url: EsriImageryProviderUrl) {
        const creationFunction = () => {
            const layers: any[] = []
            const esriLayer = new EsriImageryProviders({ url })
            if (esriLayer) {
                layers.push(esriLayer)
            }
            return layers
        }
        return this.create(
            name,
            tooltip,
            iconUrl,
            creationFunction
        )
    }


    esriImg() {
        return this.esri("Esri影像", "Esri影像", "/images/ter_c.png", EsriImageryProviderUrl.img)
    }

    esriVector() {
        return this.esri("Esri矢量", "Esri矢量", "/images/ter_c.png", EsriImageryProviderUrl.street)
    }

    mapboxStyle(name: string, tooltip: string, iconUrl: string, styleId: StyleId) {
        const { option } = this
        const creationFunction = () => {
            const layers: any[] = []
            if (option?.mapboxKey) {
                const mapboxLayer = new MapboxImageryStyleProviders(option.mapboxKey, { styleId })
                if (mapboxLayer) {
                    layers.push(mapboxLayer)
                }
            }
            return layers
        }
        return this.create(
            name,
            tooltip,
            iconUrl,
            creationFunction
        )
    }

    mapboxStreet() {
        return this.mapboxStyle("mapbox街道", "mapbox街道", "/images/ter_c.png", StyleId.streetsV11)
    }

    mapboxOutdoors() {
        return this.mapboxStyle("mapbox户外", "mapbox户外", "/images/ter_c.png", StyleId.outdoorsV11)
    }

    mapboxLight() {
        return this.mapboxStyle("mapbox亮色", "mapbox亮色", "/images/ter_c.png", StyleId.lightV10)
    }

    mapboxDark() {
        return this.mapboxStyle("mapbox暗色", "mapbox暗色", "/images/ter_c.png", StyleId.darkV10)
    }

    mapboxImg() {
        return this.mapboxStyle("mapbox影像", "mapbox影像", "/images/ter_c.png", StyleId.satelliteV9)
    }

    mapboxImgStreet() {
        return this.mapboxStyle("mapbox影像(街道)", "mapbox影像(街道)", "/images/ter_c.png", StyleId.satelliteStreetsV11)
    }

    mapboxNavDay() {
        return this.mapboxStyle("mapbox导航(白天)", "mapbox导航(白天)", "/images/ter_c.png", StyleId.navigationDayV1)
    }

    mapboxNavNight() {
        return this.mapboxStyle("mapbox导航(夜间)", "mapbox导航(夜间)", "/images/ter_c.png", StyleId.navigationNightV1)
    }

    mapBoxById(name: string, tooltip: string, iconUrl: string, mapId: string) {
        const { option } = this
        const creationFunction = () => {
            const layers: any[] = []
            if (option?.mapboxKey) {
                const mapboxLayer = new MapboxImageryProviders(option.mapboxKey, { mapId })
                if (mapboxLayer) {
                    layers.push(mapboxLayer)
                }
            }
            return layers
        }
        return this.create(
            name,
            tooltip,
            iconUrl,
            creationFunction
        )
    }
    private create(name: string, tooltip: string, iconUrl: string, creationFunction: ProviderViewModel.CreationFunction | Command) {
        return new ProviderViewModel({
            name,
            tooltip,
            iconUrl,
            creationFunction
        })
    }
}
