<template>
    <div>
        <el-form class="form" ref="form" :rules="rule"  :model="formData">
            <el-form-item label="旧密码" prop="password" >
                <el-input v-model="formData.password" type="password" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password">
                <el-input type="password" v-model="formData.new_password" placeholder="请输入新密码" ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="check_password">
                <el-input type="password" v-model="formData.check_password" placeholder="请输入新密码" ></el-input>
            </el-form-item>
        </el-form>
        <el-button class="login-btn" type="primary" @click="changePassword" >
            修改
        </el-button>
    </div>
</template>

<script>
export default {
  data() {
    const validatepassword = (rule, value, callback) => {
      if (value && value.length >= 5) {
        callback();
      } else {
        callback(new Error("必须输入旧密码"));
      }
    };
    const validatenew_password = (rule, value, callback) => {
      if (value && value.length >= 5) {
        callback();
      } else {
        callback(new Error("你需要输入一个新密码密码"));
      }
    };
    const validatecheck_password = (rule, value, callback) => {
      if (value && value.length >= 5) {
        callback();
      } else {
        callback(new Error("请确定密码"));
      }
    };
    return {
      formData: {
        password: "",
        new_password: "",
        check_password: ""
      },
      rule: {
        password: [{ validator: validatepassword, trigger: "blur" }],
        new_password: [{ validator: validatenew_password, trigger: "blur" }],
        check_password: [{ validator: validatecheck_password, trigger: "blur" }]
      }
    }
  },
  methods: {
    changePassword() {
      if (this.formData.new_password == this.formData.check_password) {
        this.$axios.put("/user/password", this.formData).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("修改成功");
            setTimeout(() => {
              this.$router.push("/layout/index");
            }, 1000);
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        this.$message.err("两次输入密码不一致");
      }
    }
  }
};
</script>

<style scoped>
</style>