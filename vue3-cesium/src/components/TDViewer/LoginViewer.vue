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
import { SkyBoxProviders } from "./utils/skyBoxProviders/SkyBoxProviders";
export default defineComponent({
  props: {},
  mounted() {
    const { tdtKey, mapboxKey } = Config;
    const providerViewModelOption = { tdtKey, mapboxKey };
    const ref: Element = this.$refs.cesiumContainer as Element;
    const defaultOptions: Viewer.ConstructorOptions = {
      baseLayerPicker: false,
      imageryProvider: new ImageryProviderViewModel(
        providerViewModelOption
      ).tdtImg() as any,
      navigationHelpButton: false,
      scene3DOnly: true,
      sceneModePicker: false,
      skyBox: new SkyBoxProviders().createSky1(),
    };
    const baseViewer = new BaseViewer(ref, defaultOptions);
    baseViewer.hideLogo();
    if (baseViewer.viewer) {
      new FlyUtil(baseViewer.viewer).flyToChina();
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>