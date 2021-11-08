import { SkyBox } from "cesium";

export class SkyBoxProviders {
  createSky1() {
    return this.create(require('./img/skybox1/tycho2t3_80_mx.jpg'),
      require('./img/skybox1/tycho2t3_80_my.jpg'),
      require('./img/skybox1/tycho2t3_80_mz.jpg'),
      require('./img/skybox1/tycho2t3_80_px.jpg'),
      require('./img/skybox1/tycho2t3_80_py.jpg'),
      require('./img/skybox1/tycho2t3_80_pz.jpg'),
    )
  }
  create(negativeX: string, negativeY: string, negativeZ: string, positiveX: string, positiveY: string, positiveZ: string) {
    return new SkyBox({
      sources: {
        negativeX,
        negativeY,
        negativeZ,
        positiveX,
        positiveY,
        positiveZ,
      },
    })
  }
}
