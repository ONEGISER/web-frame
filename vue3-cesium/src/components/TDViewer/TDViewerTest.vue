<template>
  <div class="home">
    <div class="cesium-container" ref="cesiumContainer"></div>
  </div>
</template>

<script lang="ts">
import "./style/Index.scss";
import { defineComponent } from "vue";
import { Viewer, ProviderViewModel, WebMapTileServiceImageryProvider, GeographicTilingScheme, Rectangle, Color } from "cesium";

export default defineComponent({
  props: {},
  mounted() {
    const ref: Element = this.$refs.cesiumContainer as Element;
    const layer = new WebMapTileServiceImageryProvider({
      url: "http://111.198.1.90:3003/arcgis/rest/services/qiyeyingxiang/lanzhouredianchang/MapServer/WMTS/tile/1.0.0/qiyeyingxiang_lanzhouredianchang/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}",
      tileMatrixSetID: "default028mm",
        format: "image/png",
        tilingScheme: new GeographicTilingScheme(),
        maximumLevel: 19,
        tileMatrixLabels: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
        ],
      layer: 'qiyeyingxiang_lanzhouredianchang',
      style: 'default',
      rectangle: Rectangle.fromDegrees(
        104.0634677158463,
        36.01252621157198,
        104.07458934825468,
        36.022072973962715
      ),
    })
    const layers: any[] = [layer]
    const option: Viewer.ConstructorOptions = {
      imageryProviderViewModels: [new ProviderViewModel({
        name: "",
        tooltip: "",
        iconUrl: "",
        creationFunction: () => {
          return layers
        }
      })],
    };

    const viewer = new Viewer(ref, option);
    viewer.entities.add({
      name:
        "Green translucent, rotated, and extruded rectangle at height with outline",
      rectangle: {
        coordinates: Rectangle.fromDegrees(
          104.0634677158463,
          36.01252621157198,
          104.07458934825468,
          36.022072973962715
        ),
        material: Color.GREEN.withAlpha(0.5),
        extrudedHeight: 1,
        height: 100.0,
        outline: true, // height must be set for outline to display
        outlineColor: Color.BLACK,
      },
    });
    viewer.zoomTo(viewer.entities);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>