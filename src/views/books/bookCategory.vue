<template>
    <div>
        <el-form>
            <el-form-item label="轮播图书籍">
                <el-select v-model="formData.category" @change="categoryChange">
                    <el-option v-for="(item ,index) in categoryData" :key="index" :label="item.title" :value="item._id">
                    </el-option>
                </el-select>
                <div class="book-item clearfix"  v-if="getBookItem[0]">
                    <div class="img-wrap">
                        <img :src="getBookItem[0].img" alt="">
                    </div>
                    <div class="book-desc">
                        <div class="title">
                            标题：{{getBookItem[0].title}}
                        </div>
                        <div class="author">
                            作者：{{getBookItem[0].author}}
                        </div>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <el-dialog title="书籍列表" :visible.sync="isShowDialog">
            <el-table :data="categoryData">
                <el-table-column property="title" label="分类名" width="150"></el-table-column>
                    <el-table-column  label="分类图片" width="200">
                        <template slot-scope="scope">
                            <img :src="scope.row.img" class="img-item">
                        </template>
                    </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleAddcategory(scope.row._id)">
                            添加
                        </el-button>      
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                categoryData:[],
                isShowDialog: false,
                formData:[]
            }
        },
        methods:{
            handleAddcategory(){

            },
            categoryChange(){

            },
            handleAddcategory(){

            }
        }
    }
</script>

<style scoped>

</style>