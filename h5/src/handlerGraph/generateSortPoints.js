import { line } from "./line"
import { lines } from "./lines"
import { points } from "./points"

const features = []
for (let i in lines) {
    const data = lines[i]
    if (data) {
        const a = Number(data.a)
        const b = Number(data.b)
        const c = Number(data.c)
        const d = Number(data.d)
        const aData = line[a - 1]
        const bData = line[b - 1]
        const cData = line[c - 1]
        const dData = line[d - 1]
        const axp = Number(aData.s)
        const ayp = Number(aData.e)
        const bxp = Number(bData.s)
        const byp = Number(bData.e)
        const cxp = Number(cData.s)
        const cyp = Number(cData.e)
        const dxp = Number(dData.s)
        const dyp = Number(dData.e)
        const datas = [points[axp], points[ayp], points[bxp], points[byp], points[cxp], points[cyp], points[dxp], points[dyp]]

        const coordinates = []

        for (let j in datas) {
            const temp = datas[j]
            coordinates.push([Number(temp.x), Number(temp.y)])
        }

        let start
        //[90,82],[173,85],[90,82],[32,191],[32,191],[174,101],[173,85],[174,101]
        for (let n = 0; n < coordinates.length - 1; n++) {
            const temp = coordinates[n]
            if (n === 0) {
                start = temp
            } else {
                //坐标相同
                const index = coordinates.findIndex((data, index) => {
                    return index > n && data[0] === temp[0] && data[1] === temp[1]
                })
                if (index >= 0) {
                    let g
                    if (index % 2 === 0) {
                        g = coordinates[index - 1]
                    } else {
                        g = coordinates[index + 1]
                    }
                    if (g) {
                        coordinates.splice(n + 1, 1, g)
                        coordinates.splice(index, 1)
                        n--
                    }
                }
            }
        }
        if (start) {
            coordinates.push(start)
        }

        const obj = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": coordinates
            }
        }
        features.push(obj)
    }
}
const json = {
    "type": "FeatureCollection",
    features
}
//打印GeoJSON
console.log(JSON.stringify(json));