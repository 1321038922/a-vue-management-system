<template>
    <div class="user-message">
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData">
            <el-table-column
                prop="nickname"
                label="姓名"
                width="130">
            </el-table-column>
            <el-table-column
                prop="createdTime"
                label="日期"
                width="200">
            </el-table-column>
            <el-table-column
                prop="desc"
                label="个性签名"
                width="300">
            </el-table-column>
            <el-table-column
                prop="desc"
                label="用户头像"
                width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar"  class="avatain" alt="">
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button @click="handleDetailes(scope.row._id)" size="samll" type="primary">
                        产看详情
                    </el-button >
                    <el-button @click="handleDelete(scope.row._id)" size="samll" type="primary">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pageChange"
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
      count:0,
      page:1,
    };
  },
  methods: {
    getData() {
      this.$axios.get("/user", {pn : this.page, size: 8}).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.tableData.forEach((item,index) => {
            let time = new Date(item.createdTime)
            let createdtime = item.createdTime = time.toLocaleDateString()+" "+ time.toTimeString().substr(0, 8)
            this.tableData[index].createdTime = createdtime
          })
          this.count = res.count
        }
      });
    },
    handleDetailes(id) {
      this.$router.push({path:`/layout/userDetails?id=${id}`});
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除管理员, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.post("/user/delete", { userIds: [id] }).then(res => {
            this.$message.success(res.msg);
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    pageChange(page){
      this.page = page
      this.getData()
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.avatain {
  width: 60px;
  height: 60px;
}
</style>