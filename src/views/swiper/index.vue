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
                    label="类名"
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
                       >编辑
                    </el-button>
                    <!--<el-button-->
                        <!--size="mini"-->
                        <!--@click="handleList(scope.$index, scope.row)">详情-->
                    <!--</el-button>-->
                    <!--<el-button-->
                        <!--size="mini"-->
                        <!--type="danger"-->
                        <!--@click="handleDelete(scope.$index,scope.row)">删除-->
                    <!--</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      swipers: [],
      pn: 1
    };
  },
  methods: {
    getData() {
      this.$axios.get("/swiper", { pn: this.page, size: 8 }).then(res => {
          console.log(res)
        this.swipers = res.data;
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
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
</style>