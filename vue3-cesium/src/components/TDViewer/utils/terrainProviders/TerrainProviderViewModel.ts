import { Command, createWorldTerrain, EllipsoidTerrainProvider, ProviderViewModel } from "cesium"
import { ProviderViewModelOption } from "../ImageryProviders/ImageryProviderViewModel"
import { CommonCesiumTerrainProvider } from "./CommonCesiumTerrainProvider"
import { EsriTerrainProvider } from "./EsriTerrainProvider"

export class TerrainProviderViewModel {
    option?: ProviderViewModelOption
    constructor(option: ProviderViewModelOption) {
        this.option = option
    }

    all(){
        return [this.noTerrain(),this.mars3d(), this.esri(),this.worldTerrain(), ] as any
    }


    worldTerrain() {
        return this.create("Cesium地形", "Cesium地形", "", () => {
            return createWorldTerrain()
        })
    }


    noTerrain() {
        return this.create("无地形", "无地形", "", () => {
            return new EllipsoidTerrainProvider()
        })
    }


    mars3d() {
        return this.create("火星科技", "火星科技", "", () => {
            return new CommonCesiumTerrainProvider() as any
        })
    }

    esri() {
        return this.create("ESRI地形", "ESRI地形", "", () => {
            return new EsriTerrainProvider() as any
        })
    }

    create(name: string, tooltip: string, iconUrl: string, creationFunction: ProviderViewModel.CreationFunction | Command) {
        return new ProviderViewModel({
            name,
            tooltip,
            iconUrl,
            creationFunction
        })
    }
}
