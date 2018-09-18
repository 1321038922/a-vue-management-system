<template>
    <div>
        <h2>添加管理员</h2>
        <div class="form-wrap">
            <el-form ref="form" :model="formData" size="small" label-width="80px" label-position="left">
            <el-form-item label="用户名" >
                <el-input v-model="formData.username">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" >
                <el-input type="password" v-model="formData.password">
                </el-input>
            </el-form-item>
            <el-form-item type="password" label="确认密码" >
                <el-input v-model="formData.checkpassword">
                </el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="formData.nickname">
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formData.email">
                </el-input>
            </el-form-item>
            <el-form-item label="用户头像">
                <uploadImg style="float:left" v-model="formData.avatar"></uploadImg>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input type="textarea" v-model="formData.desc">
                </el-input>
            </el-form-item>
            <el-form-item >
                <el-button @click="validateAdd" size="small" type="primary">确认添加</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
import uploadImg from "@/components/upload-com";
export default {
  components: {
    uploadImg
  },
  data() {
       const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("必须输入用户名"));
      } else {
        callback();
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value && value.length >= 5) {
        callback();
      } else {
        callback(new Error("必须输入合法密码"));
      }
    };
    return {
      formData: {
        nickname: "",
        password:'',
        email: "",
        username: "",
        desc: "",
        avatar: "",
        checkpassword:''
      },
      rule: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      },
    }
  },
  methods:{
      submitData(){
          if(this.formData.password != this.formData.checkpassword){
              this.$message.error("两次输入的密码不一致")
          }else{
            this.$axios.post('/user', this.formData).then(res =>{
                this.$message.success(res.msg)
            })
          }
      },
       validateAdd(){
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.submitData()
                } else {
                    return false;
                }
            });
        },
  }
};
</script>

<style scoped>
.form-wrap{
        width: 600px;
        margin-top: 20px;

    }
</style>