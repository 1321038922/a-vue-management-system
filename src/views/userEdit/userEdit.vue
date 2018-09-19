<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/layout/users' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <h2 class="title">修改个人信息</h2>
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
            <el-form-item label="用户头像">
                <uploadImg style="float:left" v-model="formData.avatar"></uploadImg>
            </el-form-item>
            <el-form-item label="个性签名">
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
                    avatar:''
                },
            }
        },
        methods:{
            initData(){
                this.formData = {
                    ...this.$store.state.userinfo
                }
            },
            handleclick(){
                this.$axios.put('/user/userInfo',this.formData).then(res =>{
                    console.log(res)
                    if(res.code == 200){
                        let userinfo = res.data
                        this.$store.commit('CHANGE_USERINFO',userinfo)
                        this.initData()
                        this.$message.success(res.msg)
                    }else{
                        this.$message.success("修改失败")
                    }
                })
            }
        },
        created(){
            this.initData()
        }
    }
</script>

<style scoped>
.title{
    padding-bottom: 20px;
}
.breadcrumb{
    padding-bottom: 20px;
}
    .form-wrap{
        width: 600px;
        margin-top: 20px;

    }
</style>