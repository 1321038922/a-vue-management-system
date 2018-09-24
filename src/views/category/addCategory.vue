<template>
    <div>
         <el-form :model="formData" class="form-650">
            <el-form-item label="分类标题">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="分类图片">
                <el-switch
                v-model="isUpload"
                active-text="手动上传"
                inactive-text="头图地址">
                </el-switch>             
                 <el-input v-model="formData.icon" v-if="!isUpload"></el-input>
                 <upload-img v-model="formData.icon" v-else></upload-img>
            </el-form-item>
        </el-form>
        <el-button @click="handleSubmit">提交</el-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formData:{
                    title:'',
                    icon:''
                },
                isUpload:false,
            }
        },
        methods:{
            handleSubmit(){
                this.$axios.post('/category',this.formData).then(res =>{
                    if(res.code = 200){
                        this.$message.success(res.msg)
                         this.$router.push('/layout/category')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>