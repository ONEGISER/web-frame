import { MapboxImageryProvider, MapboxStyleImageryProvider } from "cesium"

export interface MapboxImageryStyleProviderOption {
    styleId?: StyleId
}
export enum StyleId {
    streetsV11 = "streets-v11",
    outdoorsV11 = "outdoors-v11",
    satelliteV9 = "satellite-v9",
    lightV10 = "light-v10",
    darkV10 = "dark-v10",
    satelliteStreetsV11 = "satellite-streets-v11",
    navigationDayV1 = "navigation-day-v1",
    navigationNightV1 = "navigation-night-v1"
}
export class MapboxImageryStyleProviders {
    private accessToken: string = ""
    constructor(accessToken: string, option: MapboxImageryStyleProviderOption) {
        this.accessToken = accessToken
        return this.init(option) as any
    }
    init(option: MapboxImageryStyleProviderOption) {
        const { styleId } = option
        if (styleId) {
            const layer = new MapboxStyleImageryProvider({
                styleId,
                accessToken: this.accessToken
            })
            return layer
        } else {
            console.log("请检查styleId");
        }
    }
}
export interface MapboxImageryProviderOption {
    mapId?: string
}
export class MapboxImageryProviders {
    private accessToken: string = ""
    constructor(accessToken: string, option: MapboxImageryProviderOption) {
        this.accessToken = accessToken
        return this.init(option) as any
    }
    init(option: MapboxImageryProviderOption) {
        const { mapId } = option
        if (mapId) {
            const layer = new MapboxImageryProvider({
                mapId: "mapbox.streets",
                accessToken: this.accessToken
            })
            return layer
        } else {
            console.log("请检查styleId");
        }
    }
}