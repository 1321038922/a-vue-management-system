<template>
    <div>
        <div>
            <h2>轮播图列表</h2>
        </div>
        <div class="swipers">
            <el-table
                :data="swipers" class="swipers">
                <el-table-column
                    label="头图"
                    width="180"
                    >
                    <template slot-scope="scope">
                        <img :src="scope.row.img">
                    </template>
                </el-table-column>
                <el-table-column
                    label="类型"
                    width="120">
                    <template slot-scope="scope">
                        <el-tag size="medium" style="cursor: pointer">
                            {{ scope.row.sort }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="index"
                    width="100">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.index }}</span>
                    </template>
                </el-table-column>
                 <el-table-column
                    label="标题"
                    width="230">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="edit(scope.row._id)"
                       >编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleDelete(scope.row._id)">删除
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
    </div>
</template>

<script>
export default {
  data() {
    return {
      swipers: [],
      pn: 1,
      count:0,
    };
  },
  methods: {
    getData() {
      this.$axios.get("/swiper", { pn: this.pn, size: 8 }).then(res => {
          console.log(res)
        this.swipers = res.data;
        this.count = res.count
      });
    },
    handleDelete(id){
        this.$confirm('此操作将永久删除轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.post('/swiper/delete',{ids:[id]}).then(res =>{
                
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
    edit(id){
        this.$router.push({name:'editSwipers',query:{id}})
    },
    pnChange(pn) {       
        this.pn = pn
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
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
</style>