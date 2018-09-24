<template>
    <div>
      <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/layout/books' }">图书列表</el-breadcrumb-item>
                <el-breadcrumb-item>编辑图书信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <h2 class="title">编辑图书信息</h2>
        <div class="form-wrap">
            <el-form :model="formData" size="small" label-width="80px" label-position="left">
            <el-form-item label="书籍头图">
                <upload-img v-model="formData.img"></upload-img>
            </el-form-item>
            <el-form-item label="作者" >
                <el-input v-model="formData.author">
                </el-input>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="formData.title">
                </el-input>
            </el-form-item>
            <el-form-item label="index">
                <el-input v-model="formData.index">
                </el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" v-model="formData.desc">
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
      formData: {
        index:'',
        desc: "",
        author: "",
        img: "",
        type: "",
        title: "",  
      },    
    };
  },
  methods: {
    getData() {
      this.$axios.get(`/book/${this.$route.query.id}`).then(res => {
        console.log(res);
        this.formData = res.data
      });
    },
    handleclick(){
      let params = {
        ...this.formData,
        book_id:this.$route.query.id
      }
      this.$axios.put('/book', params).then(res =>{
        if(res.code == 200){
          this.$message.success(res.msg)
        }
        this.getData()
      })
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.title{
  margin: 20px 0;
}
</style>