<template>
  <div class="login-container">
    <el-row class="bg">
      <LoginViewer></LoginViewer>
    </el-row>
    <el-row class="logo">
      <Logo :imgUrl="imgUrl"> </Logo>
    </el-row>
    <el-row  class="box">
      <LoginPanel></LoginPanel>
    </el-row>
  </div>
</template>

<script lang="ts">
import "./style/Entry.scss";
import { defineComponent } from "vue";
import Logo from "../logo/Logo.vue";
import LoginViewer from "../../../components/TDViewer/LoginViewer.vue";
import LoginPanel from "../loginPanel/LoginPanel.vue";
export default defineComponent({
  data() {
    return { imgUrl: require("./img/logo.png") };
  },
  name: "Login",
  components: {
    Logo,
    LoginViewer,
    LoginPanel,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
</style>