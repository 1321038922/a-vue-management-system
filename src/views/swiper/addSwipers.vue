<template>
    <div class="add-swiper">
        <div>
            <h2>{{title}}</h2>
        </div>
        <div>
            <el-form :model="formData" class="form-650">
                <el-form-item label="轮播图标题">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
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
                <el-form-item label="轮播图头图">
                    <upload-img class="f-l" v-model="formData.img"></upload-img>
                </el-form-item>
                <el-form-item label="轮播图排序">
                    <el-input-number v-model="formData.index" :min="1"></el-input-number>   
                </el-form-item>
            </el-form>
            <el-button type="primary" size="small" @click="handleAddswiper" v-if="$route.name == 'addSwipers'">
                提交
            </el-button>
            <el-button type="primary" size="small" @click="handleEdit" v-else>
                保存更改
            </el-button>
            <el-dialog title="书籍列表" :visible.sync="isShowDialog">
                <el-table :data="bookData">
                    <el-table-column property="title" label="书名" width="150"></el-table-column>
                        <el-table-column  label="书籍头图" width="200">
                            <template slot-scope="scope">
                                <img :src="scope.row.img" class="img-item">
                            </template>
                        </el-table-column>
                    <el-table-column property="author" label="作者" width="200"></el-table-column>
                    <el-table-column  label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="handleAddBook(scope.row._id)">
                                添加
                            </el-button>      
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: "",
        img: "",
        book: "",
        index: "",
        category: ""
      },
      categoryData: [],
      isShowDialog: false,
      bookCount: 0,
      bookData: [],
      title: "添加轮播图页面"
    };
  },
  methods: {
    getcategory() {
      this.$axios.get("/category").then(res => {
        this.categoryData = res.data;
      });
    },
    categoryChange() {
      this.isShowDialog = true;
      this.getbookData();
    },
    async getbookData() {
      const res = await this.$axios.get(
        `/category/${this.formData.category}/books`
      );
      this.bookData = res.data.books;
      this.bookCount = res.count;
    },
    handleAddBook(id) {
      this.formData.book = id;
      this.isShowDialog = false;
    },
    handleAddswiper() {
      let isCanadd = true;
      for (let key in this.formData) {
        if (!this.formData[key]) {
          isCanadd = false;
        }
      }
      if (isCanadd) {
        this.$axios.post("/swiper", this.formData).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.$router.push({ path: "swiper" });
          }
        });
      } else {
        this.$message.error("请填写完整信息");
      }
    },
    getInitData() {
      //在编辑页面使用
      this.$axios.get(`/swiper/${this.$route.query.id}`).then(res => {
        this.formData = {
          ...this.formData,
          ...res.data,
          book: res.data.book._id, //回填书籍id
          category: res.data.book.type //回填分类id
        };
        this.getbookData();
      });
    },
    handleEdit() {
      //在编辑页面下保存更改
      this.$axios
        .put(`/swiper/${this.$route.query.id}`, this.formData)
        .then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.$router.push({ path: "swiper" });
          } else {
            this.$message.error("请填写完整信息");
          }
        });
    }
  },
  created() {
    this.getcategory();
    //判断是哪个页面
    if (this.$route.name == "addSwipers") {
    } else {
      //编辑页面
      this.getInitData();
      this.title = '编辑轮播图页面'
    }
  },
  computed: {
    getBookItem() {
      if (this.formData.book) {
        return this.bookData.filter(item => item._id == this.formData.book);
      } else {
        return [];
      }
    }
  },
  watch: {
    $route(to, form) {
      this.formData = {
        title: "",
        img: "",
        book: "",
        index: "",
        category: ""
      };
    }
  }
};
</script>

<style scoped>
.img-item {
  height: 80px;
  width: 80px;
}
.book-item {
  width: 500px;
  border: 1px solid #999;
  padding: 15px;
  margin-top: 40px;
  border-radius: 4px;
}
.book-item .img-wrap {
  float: left;
  width: 100px;
  height: 120px;
}
.img-wrap img {
  display: block;
  width: 100%;
  height: 100%;
}
.book-desc {
  float: left;
  margin-left: 20px;
}
.book-desc .title {
  color: #333;
  font-weight: 700;
  font-size: 15px;
}
.book-desc .author {
  color: #555;
}
</style>