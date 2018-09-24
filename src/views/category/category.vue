<template>
    <div>
        <el-table           
            :data="formData"
            style="width: 100%">
            <el-table-column
                label="分类图片"
                width="300">
                 <template slot-scope="scope">
                    <img :src="scope.row.icon"  class="avatain" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="150">
            </el-table-column>
            <el-table-column
                prop="index"
                label="index"
                width="160">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDetails(scope.row._id)">查看所属书籍
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit( scope.row._id)">编辑
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row._id)">删除
                </el-button>
                </template>
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
  data() {
    return {
      formData: [],
      pn: 1,
      count:0
    };
  },
  methods: {
    getData() {
      this.$axios.get("/category", { pn: this.pn, size: 6 }).then(res => {
        if ((res.code = 200)) {
          this.formData = res.data;
          this.count = res.count;
        }
        console.log(res);
      });
    },
    pnChange(pn) {
      this.pn = pn;
      this.getData();
    },
    handleDetails(id) {
      this.$router.push({name:'booksIncategory',query:{id}})
    },
    handleEdit(id) {
        this.$router.push({name:'editCategory',query:{id}})
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/category/${id}`).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
img {
  height: 160px;
}
</style>