<template>
  <div class="home">
    <div class="cesium-container" ref="cesiumContainer"></div>
    <div
      style="
        position: absolute;
        left: 0;
        top: 0;
        height: 500px;
        width: 300px;
        z-index: 1000;
      "
    >
      <el-tree
        style="width: 100%; height: 100%"
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>
              <edit
                v-if="data.icon === 1"
                style="width: 1em; height: 1em; margin-right: 8px"
              />
              <share
                v-if="data.icon === 2"
                style="width: 1em; height: 1em; margin-right: 8px"
              />
              <delete
                v-if="data.icon === 3"
                style="width: 1em; height: 1em; margin-right: 8px"
              />

              <el-checkbox
                @change="handleCheckChange($event, data)"
                v-if="data.isLayer"
              ></el-checkbox>
            </span>
            <span>{{ node.label }}</span>
            <span>
              <!-- <a @click="append(data)"> Append </a>
              <a @click="remove(node, data)"> Delete </a> -->
            </span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script lang="ts">
import "./style/Index.scss";
import { defineComponent } from "vue";
import {
  Viewer,
  WebMapTileServiceImageryProvider,
  WebMercatorTilingScheme,
} from "cesium";
import { Edit, Share, Delete } from "@element-plus/icons";
let viewer: Viewer;
const layers: any[] = [];
export default defineComponent({
  components: {
    Edit,
    Share,
    Delete,
  },
  props: {},
  data() {
    return {
      data: [
        {
          label: "矢量",
          icon: 1,
          children: [
            {
              id: 1,
              label: "天地图矢量",
              isLayer: true,
            },
          ],
        },
        {
          label: "影像",
          icon: 2,
          children: [
            {
              id: 2,
              label: "天地图影像",
              isLayer: true,
            },
          ],
        },
        {
          label: "高程",
          icon: 3,
          children: [
            {
              id: 3,
              label: "二级 3-1",
              isLayer: true,
            },
            {
              id: 4,
              label: "二级 3-2",
              isLayer: true,
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    const ref: Element = this.$refs.cesiumContainer as Element;
    const defaultOptions: Viewer.ConstructorOptions = {
      animation: false,
      timeline: false,
      homeButton: false,
      geocoder: false,
    };
    viewer = new Viewer(ref, defaultOptions);
  },
  methods: {
    handleNodeClick(data: any) {
      console.log(data);
    },
    handleCheckChange(checked: boolean, data: any) {
      console.log(checked, data.id);
      if (checked === true) {
        this.addLayer(data);
      } else if (checked === false) {
        this.removeLyer(data);
      }
    },
    addLayer(data: any) {
      let layer: any;
      switch (data.id) {
        case 1:
          // layer = new WebMapTileServiceImageryProvider({
          //   url: "http://t{s}.tianditu.com/vec_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=19b72f6cde5c8b49cf21ea2bb4c5b21e",
          //   layer: "vec",
          //   style: "default",
          //   tileMatrixSetID: "c",
          //   format: "tiles",
          //   subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          //   tilingScheme: new GeographicTilingScheme(),
          //   tileMatrixLabels: [
          //     "1",
          //     "2",
          //     "3",
          //     "4",
          //     "5",
          //     "6",
          //     "7",
          //     "8",
          //     "9",
          //     "10",
          //     "11",
          //     "12",
          //     "13",
          //     "14",
          //     "15",
          //     "16",
          //     "17",
          //     "18",
          //     "19",
          //   ],
          // });
          layer = new WebMapTileServiceImageryProvider({
            url: "http://t{s}.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=19b72f6cde5c8b49cf21ea2bb4c5b21e",
            layer: "vec",
            style: "default",
            format: "tiles",
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
            tilingScheme: new WebMercatorTilingScheme(),
            tileMatrixSetID: "w",
          });
          break;
        case 2:
          layer = new WebMapTileServiceImageryProvider({
            url: "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=19b72f6cde5c8b49cf21ea2bb4c5b21e",
            layer: "img",
            style: "default",
            format: "image/jpeg",
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
            tilingScheme: new WebMercatorTilingScheme(),
            tileMatrixSetID: "w",
          });
          break;
      }
      if (layer) {
        const _layer: any = viewer.imageryLayers.addImageryProvider(
          layer,
          layers.length + 10
        );
        _layer.data = data;
        layers.push(_layer);
      }
    },
    removeLyer(data: any) {
      if (layers) {
        for (let i in layers) {
          const layer = layers[0];
          if (layer.data?.id === data.id) {
            viewer.imageryLayers.remove(layer);
            layers.splice(Number(i), 1);
            break;
          }
        }
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>