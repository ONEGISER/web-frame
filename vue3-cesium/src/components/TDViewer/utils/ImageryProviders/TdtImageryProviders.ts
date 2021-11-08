import { GeographicTilingScheme, WebMapTileServiceImageryProvider, WebMercatorTilingScheme } from "cesium"
export const Subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];// 服务负载子域
export const TdtUrl = 'https://t{s}.tianditu.gov.cn';
export const TdtTypes = {
    VEC_BASE_GCS: "vec_c",
    VEC_ANNO_GCS: "cva_c",
    VEC_ANNO_GCS_EN: "eva_c",

    //国界服务
    ibo_c: "ibo_c",
    ibo_w: "ibo_w",

    VEC_BASE_WEBMERCATOR: "vec_w",
    VEC_ANNO_WEBMERCATOR: "cva_w",
    VEC_ANNO_WEBMERCATOR_EN: "eva_w",

    IMG_BASE_GCS: "img_c",
    IMG_ANNO_GCS: "cia_c",
    IMG_ANNO_GCS_EN: "eia_c",

    IMG_BASE_WEBMERCATOR: "img_w",
    IMG_ANNO_WEBMERCATOR: "cia_w",
    IMG_ANNO_WEBMERCATOR_EN: "eia_w",

    TER_BASE_GCS: "ter_c",
    TER_ANNO_GCS: "cta_c",

    TER_BASE_WEBMERCATOR: "ter_w",
    TER_ANNO_WEBMERCATOR: "cta_w"
}

export interface TdtOption {
    url?: string
    id?: string
}

interface Info {
    type: string
    layer: string
    matrix: string
    id: string
}
/**
 * created by onegiser at 2021-7-20
 */
export class TdtImageryProviders {
    private key?: string = ""
    private option?: TdtOption = {}
    constructor(key: string, option?: TdtOption) {
        this.key = key
        this.option = option
        const info = this.getInfo()
        return info.matrix === "c" ? this.createTdtGeoLayer(info) : this.createProjTdt(info) as any
    }

    private getInfo() {
        let type = TdtTypes.IMG_BASE_GCS
        let _id: string = type
        let layer = "", matrix = ""
        const { option } = this
        if (option) {
            const { url, id } = option
            if (url)
                type = url
            if (id)
                _id = id
        }
        const str = "_"
        if (type.indexOf(str) < 0) {
            console.log("地址不合法 请检查")
        } else {
            const arr = type.split(str)
            layer = arr[0]
            matrix = arr[1]
        }
        return { type, layer, matrix, id: _id }
    }

    createTdtGeoLayer(info: Info) {
        const { type, layer, matrix, id } = info
        return new WebMapTileServiceImageryProvider({
            url: this.getTdtUrlByType(type, layer),
            layer: id,
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: matrix,
            subdomains: Subdomains,
            tilingScheme: new GeographicTilingScheme(),
            tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]
        })
    }

    createProjTdt(info: Info) {
        const { type, layer, matrix, id } = info
        return new WebMapTileServiceImageryProvider({
            url: this.getTdtUrlByType(type, layer),
            layer: id,
            style: "default",
            format: "image/jpeg",
            subdomains: Subdomains,
            tilingScheme: new WebMercatorTilingScheme(),
            tileMatrixSetID: matrix,
        });
    }

    getTdtUrlByType(type: string, layer: string) {
        if (this.key) {
            return `${TdtUrl}/${type}/wmts?service=WMTS&version=1.0.0&request=GetTile&TileMatrix={TileMatrix}&layer=${layer}&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles&tk=${this.key}`;
        } else {
            console.log("请输入天地图的key")
            return ''
        }
    }
}