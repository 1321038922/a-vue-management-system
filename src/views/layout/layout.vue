<template>
    <div>
        <div class="layout">
            <div class="header ml-200">
                <h1>悦读后台操作系统</h1>
                <div class="login-layla">
                    <el-dropdown  @command="handleCommand" >
                      <span class="el-dropdown-link">
                          <img :src="$store.state.userinfo.avatar" >
                          <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item  command="1">修改个人信息</el-dropdown-item>
                          <el-dropdown-item divided command="2">修改密码</el-dropdown-item>
                          <el-dropdown-item divided command="3">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="side-bar">
                <el-menu
                    :router="true"
                    background-color="#545c64"
                    text-color="#fff">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户相关</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/layout/index">首页</el-menu-item>
                            <el-menu-item index="/login">登录页</el-menu-item>
                            <el-menu-item index="/layout/users">用户管理页面</el-menu-item>
                            <el-menu-item index="/layout/userAdd">添加用户页面</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>图书管理</span>
                        </template>
                        <el-menu-item-group>
                          <el-menu-item index="/layout/books">图书列表</el-menu-item>
                          <el-menu-item index="/layout/addBook">添加图书</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>轮播图</span>
                        </template>
                        <el-menu-item-group>
                           <el-menu-item index="/layout/swiper">轮播图列表</el-menu-item>
                           <el-menu-item index="/layout/addSwipers">添加轮播图</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>分类管理</span>
                        </template>
                        <el-menu-item-group>
                           <el-menu-item index="/layout/category">分类列表</el-menu-item>
                           <el-menu-item index="/layout/addCategory">添加分类</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    </el-menu>
                </div>
            <div class="main-content ml-200">
                <router-view>

                </router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    handleCommand(command) {
      let click = command;
      if (click == 1) {
        this.$router.push("/layout/userEdit");
      }else if(click == 2){
         this.$router.push("/layout/changePassword");
      }else if (click == 3) {
        this.$axios.get("logout").then(res => {
          if (res.code == 200) {
            this.$store.commit("CHANGE_USERINFO", null);
            this.$router.push("/login");
          }else{
            this.$router.push("/login");
          }
        });
      }
    }
  },
  
};
</script>

<style>
.el-menu {
  border-right: none;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-link img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-icon-arrow-down {
  font-size: 12px;
  color: #fff;
}
</style>

<style scoped>
.layout h1 {
  text-align: center;
  font-weight: 400;
  line-height: 60px;
  height: 60px;
  border-bottom: 1px solid f1f1f1;
  font-size: 20px;
}
.ml-200 {
  margin-left: 200px;
}
.side-bar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 200px;
  border-right: 1px solid #f1f1f1;
  overflow: hidden;
  padding-top: 60px;
  background: #545c64;
}
.main-content {
  padding: 15px;
}
.top-tab {
  position: fixed;
  top: 0;
  left: 200px;
  right: 0;
  height: 50px;
  line-height: 1rem;
  border-bottom: 1px solid #2d3a4b;
  text-align: center;
  color: #fff;
  background-color: #2d3a4b;
  z-index: 999;
}
.login-layla {
  position: absolute;
  top: 0;
  right: 20px;
  z-index: 1000;
}
</style>