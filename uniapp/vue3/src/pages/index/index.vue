<template>
  <view class="content">
    <div id="cesiumContainer"></div>
  </view>
</template>

<script  lang="ts">
// import "cesium/Build/Cesium/Widgets/widgets.css";

export default {
  props: {},
  mounted() {
    // 动态引入css文件
    // const linkDom = document.createElement("link");
    // linkDom.rel = "stylesheet";
    // linkDom.href = "static/Cesium/Widgets/widgets.css";
    // document.head.appendChild(linkDom);
    // const script = document.createElement("script");
    // script.src = "static/Cesium/Cesium.js";
    // script.onload = this.init.bind(this);
    // document.head.appendChild(script);
    this.init();
  },
  methods: {
    init() {
      const viewer = new Cesium.Viewer("cesiumContainer", {
        terrainProvider: Cesium.createWorldTerrain(), // 创建世界地形
        infoBox: false, //是否显示点击要素之后显示的信息
        fullscreenButton: true, //是否全屏显示
        vrButton: true,
        shouldAnimate: true,
        animation: false, //是否显示动画控件
        timeline: false, //是否显示时间轴
        homeButton: false, //是否显示home键
        navigationInstructionsInitiallyVisible: false,
        geocoder: false, //是否显示地名查找控件
        selectionIndicator: false, //是否显示选取指示器组件
        sceneModePicker: true,
        scene3DOnly: false, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      });

      viewer._cesiumWidget._creditContainer.style.display = "none";

      const options: any = {};
      // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
      options.defaultResetView = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);
      // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
      options.enableCompass = true;
      // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
      options.enableZoomControls = true;
      // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
      options.enableDistanceLegend = true;
      // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
      options.enableCompassOuterRing = true;

      //修改重置视图的tooltip
      options.resetTooltip = "重置视图";
      //修改放大按钮的tooltip
      options.zoomInTooltip = "放大";
      //修改缩小按钮的tooltip
      options.zoomOutTooltip = "缩小";

      //如需自定义罗盘控件，请看下面的自定义罗盘控件
      new CesiumNavigation(viewer, options);
    },
  },
};
</script>

<style>
.content {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
#cesiumContainer {
  width: 100%;
  height: 100%;
  position: absolute;
}

@media screen and (max-width: 700px), screen and (max-height: 420px) {
  .compass {
    display: block !important;
  }
  .navigation-controls {
    display: block !important;
  }
}
.cesium-viewer .cesium-widget-credits {
  display: none;
}
</style>
