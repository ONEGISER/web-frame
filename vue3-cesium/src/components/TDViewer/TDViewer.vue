<template>
  <div class="home">
    <div class="cesium-container" ref="cesiumContainer"></div>
  </div>
</template>

<script lang="ts">
import "./style/Index.scss";
import { defineComponent } from "vue";
import { Config } from "../../configs/config";
import { BaseViewer } from "./utils/BaseViewer";
import { FlyUtil } from "./utils/FlyUtil";
import { Viewer } from "cesium";
import { ImageryProviderViewModel } from "./utils/ImageryProviders/ImageryProviderViewModel";
import { TerrainProviderViewModel } from "./utils/terrainProviders/TerrainProviderViewModel";
export default defineComponent({
  props: {},
  mounted() {
    const { tdtKey, mapboxKey } = Config;
    const ref: Element = this.$refs.cesiumContainer as Element;
    const providerViewModelOption = { tdtKey, mapboxKey };
    const option: Viewer.ConstructorOptions = {
      imageryProviderViewModels: new ImageryProviderViewModel(
        providerViewModelOption
      ).all(),
      terrainProviderViewModels: new TerrainProviderViewModel(
        providerViewModelOption
      ).all(),
    };

    const baseViewer = new BaseViewer(ref, option);
    baseViewer.hideLogo();
    baseViewer.changeSceneBgTransparent();
    baseViewer.changeProviderViewModelTitle();
    baseViewer.cancleSwitchAnimation();
    if (baseViewer.viewer) {
      new FlyUtil(baseViewer.viewer).flyToChina();
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>