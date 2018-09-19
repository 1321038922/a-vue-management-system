<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/layout/users' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>查看详细信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <h2 class="title">查看详细信息</h2>
        <div class="form-wrap">
            <el-form :model="formData" size="small" label-width="80px" label-position="left">
            <el-form-item label="用户名" >
                <el-input :disabled="true" v-model="formData.username">
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
            <el-form-item label="创建时间" >
                <el-input v-model="createdtime" :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="用户头像">
                <uploadImg style="float:left" v-model="formData.avatar"></uploadImg>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input type="textarea" v-model="formData.desc">
                </el-input>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
import uploadImg from '@/components/upload-com';
export default {
    components:{
            uploadImg
        },
    data(){
        return{
            formData:{
                nickname:'',
                email:'',
                username:'',
                desc:'',
                avatar:'',
            },
            userID:'',
            createdtime:''
        }
    },
  methods: {
    getData() {
        let userID = this.userID
      this.$axios.get(`/user/${userID}`).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.formData = res.data
          let time = new Date(res.data.createdTime)
          this.createdtime = time.toLocaleDateString()+" "+ time.toTimeString().substr(0, 8)
        }
      });
    },
  },
  created(){
     this.userID = this.$route.query.id
     this.getData()
  }
  
};
</script>

<style scoped>
.title{
    padding-bottom: 20px;
}
.breadcrumb{
    padding-bottom: 20px;
}
</style>