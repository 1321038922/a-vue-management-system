<template>
    <div>
        <h1>传统上传图片</h1>
        <!-- <div>
            <form action="https://upload-z1.qiniup.com" method="post" enctype="multipart/form-data">
                <input type="file" name="file">
                <br>
                <input type="text" name='token' v-model="token">
                <br>
                <button>
                    提交
                </button>
            </form>
        </div> -->
        <!-- <h2>ajax上传图片</h2>
        <input type="file"  @change="handleChange">
        <img :src="imgData" alt=""> -->
        <uploadCom @success="uploadImg"></uploadCom>
        <div style="border: 1px solid #000">
            <img :src="imgData" alt="">
        </div>
        <comcheckbox v-model="myCheckbox"></comcheckbox>
    </div>
</template>

<script>
import axios from 'axios';
import uploadCom from '@/components/upload-com';
import comcheckbox from '@/components/checkbox';
    export default {
        name:'index',
        components :{
            uploadCom,
            comcheckbox
        },
        data () {
            return {
                token: '',
                imgData: '',
                myCheckbox:''
            }
        },
        methods: {
            getToken() {
                axios.get('http://upload.yaojunrong.com/getToken').then(res =>{
                    console.log(res)
                    this.token = res.data.data
                })
            },
             handleChange(event){
                console.log(event)
                let file = event.target.files[0]

                let formData = new FormData()
                formData.append('file',file,file.name)
                formData.append('token',this.token)
                axios.post('https://upload-z1.qiniup.com' ,formData,{
                    handers:{
                        'Content-type' : 'multipart/form-data',
                        // 'Content-type' : 'application/x-www-form-ulencoded',
                        // 'Content-type' : 'application/json',
                    }
                }).then(res =>{
                    this.imgData = res.data.url
                })
            },
            uploadImg(url){
            this.imgData = url
        },
        },
        created() {
            this.getToken()
        }
    }
</script>

<style scoped>

</style>