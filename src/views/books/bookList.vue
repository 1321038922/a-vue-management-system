<template>
    <div>
        <div>
            <h2>图书列表</h2>
        </div>
        <el-table
            
            :data="tableData"
            style="width: 100%">
            <el-table-column
                label="头像"
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
            
            <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
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
    getData() {
      this.$axios.get("/book", { pn: this.page, size: 8 }).then(res => {
        console.log(res);
        this.tableData = res.data;
        this.count = res.count;
        this.tableData.forEach((item, index) => {
          let time = new Date(item.createTime);
          let createTime = (item.createTime =
            time.toLocaleDateString() + " " + time.toTimeString().substr(0, 8));
          this.tableData[index].createTime = createTime;
        });
      });
    },
    pnChange(pn) {
      this.pn = pn;
      this.getData();
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
img {
  height: 120px;
}
</style>