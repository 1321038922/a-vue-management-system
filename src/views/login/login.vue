<template>
    <div class="container">
        <h1 class="title">欢迎来到悦读后台管理系统</h1>
        
        <div class="login-box">
            <h2 class="login-box-title">请登录</h2>
            <el-form class="form" ref="form" :rules="rule" :model="formData">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" type="username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formData.password" placeholder="请输入密码" @keyup.enter.native="validateLogin"></el-input>
                </el-form-item>
            </el-form>
            <el-button class="login-btn" type="primary" @click="validateLogin" :loading="isLoading">
              登录
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("必须输入合法用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value && value.length >= 5) {
        callback();
      } else {
        callback(new Error("必须输入合法密码"));
      }
    };
    return {
      formData: {
        username: "",
        password: ""
      },
      rule: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      },
      isLoading: false
    }
  },
  methods: {
    handleLogin() {
      this.isLoading = true;
      this.$axios.post("/login", this.formData).then(res => {
          if (res.code == 200) {
            this.$store.commit('CHANGE_USERINFO', res.data)
            this.$message.success("登陆成功");
            setTimeout(() => {
              this.$router.push("/layout/index");
            }, 1000);
          } else {
            this.$message.error(res.msg);
          }
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
        });
    },
    validateLogin(){
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.handleLogin()
                } else {
                    return false;
                }
            });
        },
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #545c64;
  overflow: hidden;
}
.container .title {
  margin-top: 100px;
  text-align: center;
  color: #fff;
  font-weight: 400;
}
.login-box {
  width: 400px;
  height: 300px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 40px;
  margin: 20px auto 0;
}
.login-box-title {
  text-align: center;
  color: #666;
}
.form {
  margin-top: 20px;
}
.login-btn {
  width: 100%;
  box-sizing: border-box;
}
</style>