import { line } from "./line"
import { points } from "./points"
const features = []
for (let i in line) {
    const data = line[i]
    if (data) {
        const fp = Number(data.x)
        const lp = Number(data.y)
        const fpData = points[fp]
        const lpData = points[lp]

        const coordinates = [[Number(fpData.x), Number(fpData.y)], [Number(lpData.x), Number(lpData.y)]]
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

console.log(JSON.stringify(json));