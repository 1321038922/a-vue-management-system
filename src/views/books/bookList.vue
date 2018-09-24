<template>
    <div>
        <div>
            <h2>图书列表</h2>
        </div>
        <el-table           
            :data="tableData"
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
                width="100">
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
            
            <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleEdit( scope.row._id)">编辑
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row._id)">删除
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="addCategory(scope.row._id)">给书籍添加分类
                </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pnChange"
          :page-size="8"
          :total="count">
        </el-pagination>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pn: 1,
      count: 0
    };
  },
  methods: {
    getcount() {
      this.$axios.get("/book", { pn: this.pn, size: 100000 }).then(res => {
        this.count = res.data.length;
      });
    },
    getData() {
      this.$axios.get("/book", { pn: this.pn, size: 8 }).then(res => {
        console.log(res);
        this.tableData = res.data;
        this.tableData.forEach((item, index) => {
          let time = new Date(item.createTime);
          let createTime = (item.createTime =
            time.toLocaleDateString() + " " + time.toTimeString().substr(0, 8));
          this.tableData[index].createTime = createTime;
        });
      });
    },
    handleDelete(id){
        this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.delete(`/book/${id}`).then(res =>{  
                console.log(res)           
                if(res.code == 200) {
                    this.$message.success(res.msg)
                    this.getData()
                }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleEdit(id){
        this.$router.push({name:'editBook',query:{id}})
    },
    addCategory(id){
        this.$router.push({name:'bookCategory',query:{id}})
    },
    pnChange(pn) {
      this.pn = pn;
      this.getData();
    }
  },
  created() {
      this.getcount()
    this.getData();
  }
};
</script>

<style scoped>
img {
  height: 120px;
}
</style>