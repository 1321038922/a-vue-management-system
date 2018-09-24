<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/layout/category' }">分类列表</el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}下的图书</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <h2 class="title">{{title}}下的图书</h2>
        <el-table           
            :data="formData"
            style="width: 100%">
            <el-table-column
                label="封面"
                width="120">
                 <template slot-scope="scope">
                    <img :src="scope.row.img"  class="avatain" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="author"
                label="作者"
                width="150">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间"
                width="160">
            </el-table-column>
            <el-table-column
                prop="looknums"
                label="观看人数"
                width="100">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="180">
            </el-table-column>
            <el-table-column
            
                prop="desc"
                label="简介"
                width="350">
            </el-table-column>
        </el-table>
         <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pnChange"
          :page-size="6"
          :total="count">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formData:[],
                count:0,
                title:'',
                pn:1,
            }
        },
        methods:{
            getData(){
                this.$axios.get(`/category/${this.$route.query.id}/books`,{ pn: this.pn, size: 6 }).then(res =>{
                    if(res.code == 200){
                        console.log(res)
                        this.formData = res.data.books
                        this.formData.forEach((item, index) => {
                        let time = new Date(item.createTime);
                        let createTime = (item.createTime =
                            time.toLocaleDateString() + " " + time.toTimeString().substr(0, 8));
                        this.formData[index].createTime = createTime;
                        });
                        this.count = res.count
                        this.title = res.data.title
                    }
                })
            },
            pnChange(pn){
                this.pn = pn
                this.getData()
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped>
    img{
        height: 160px;
    }
    .title{
        margin: 20px 0;
    }
</style>