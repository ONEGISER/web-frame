<template>
  <el-row align="middle" justify="center" class="login">
    <el-form
      class="login-form"
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
      label-position="left"
      label-width="0px"
    >
      <div class="title">
        <h3>账号密码登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          auto-complete="off"
          placeholder="账号"
        >
          <i class="fa fa-user-o"></i>
        </el-input>
      </el-form-item>

      <!-- password -->
      <el-form-item prop="pwd">
        <el-input
          type="password"
          v-model="ruleForm.pwd"
          auto-complete="off"
          placeholder="密码"
        >
          <i class="fa fa-lock"></i>
        </el-input>
      </el-form-item>

      <!-- 登录button -->
      <el-form-item>
        <el-button
          :loading="isLogin"
          @click="submitForm('ruleForm')"
          type="primary"
          style="width: 100%"
          >登录</el-button
        >
      </el-form-item>

      <!-- 7天登录和忘记密码 -->
      <!-- <el-form-item class="item">
        <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin"
          >7天内自动登录</el-checkbox
        >
        <el-button @click="$router.push('/password')" type="text" class="forget"
          >忘记密码？</el-button
        >
      </el-form-item> -->
    </el-form>
  </el-row>
</template>


<script lang="ts">
import { Vue } from "vue-class-component";
export default class LoginPanel extends Vue {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  }

  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      console.log(valid);
    });
  }
}
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
}
.login-form {
  width: 80%;
}
.item {
  color: #fff;
}
h3 {
  color: #fff;
}
</style>