<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/layout/category' }">分类列表</el-breadcrumb-item>
                <el-breadcrumb-item>编辑分类信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <h2 class="title">编辑图书信息</h2>
        <div class="form-wrap">
            <el-form :model="formData" size="small" label-width="80px" label-position="left">
            <el-form-item label="分类图片">
                <upload-img v-model="formData.icon"></upload-img>
            </el-form-item>
            <el-form-item label="index" >
                <el-input v-model="formData.index">
                </el-input>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="formData.title">
                </el-input>
            </el-form-item>
            <el-form-item >
                <el-button @click="handleclick" size="small" type="primary">保存更改</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formData:{
          title:'',
          index:'',
          icon:''
      },
    };
  },
  methods: {
    getData() {
      this.$axios.get(`/category/${this.$route.query.id}`).then(res => {
        if (res.code = 200) {
          this.formData = res.data;
        }else{
            this.$message.error(res.msg)
        }
        console.log(res);
      });
    },
    handleclick() {
        this.$axios.put(`/category/${this.$route.query.id}`,this.formData).then(res =>{
            if(res.code == 200){
                this.$message.success(res.msg)
                this.getData()
            }else{
                this.$message.error(res.msg)
            }
        })
    }
  },
  created() {
    this.getData()
  }
};
</script>

<style scoped>
.title {
  margin: 20px 0;
}
</style>