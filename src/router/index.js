import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const components = {
  login:()=> import('@/views/login/login'),
  layout:()=> import ('@/views/layout/layout'),
  index:()=> import('@/views/index/index'),
  books:()=> import('@/views/books/bookList'),
  swiper:()=> import('@/views/swiper/index'),
  users:()=> import('@/views/users/index'),
  userAdd:()=> import('@/views/userAdd/userAdd'),
  testUpload:()=> import('@/views/testUpload/index'),
  userEdit:()=> import('@/views/userEdit/userEdit'),
  userDetails:()=> import('@/views/userDetails/userDetails'),
  changePassword:()=> import('@/views/userDetails/changePassword'),
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      meta:{
        title:'用户登录'
      },
    },
    {
      path:'/login',
      component:components.login,
      meta:{
        title:'用户登录'
      },
    },
    {
      path:'/layout',
      component:components.layout,
      redirect:'/layout/index',
      meta:{
        title:'首页'
      },
      children:[
        {
          path:'index',
          component:components.index,
          meta:{
            title:'首页'
          },
        },
        {
          path:'users', 
          meta:{
            title:'用户管理'
          },
          component:components.users,
        },
          {
            path:'userAdd',
            meta:{
              title:'添加管理员'
            },
            component:components.userAdd,
          },
          {
            path:'testUpload',
            meta:{
              title:'图片上传'
            },
            component:components.testUpload,
          },
          {
            path:'userEdit',
            meta:{
              title:'修改用户信息'
            },
            component:components.userEdit
          },
          {
            path:'userDetails',
            meta:{
              title:'详情页'
            },
            component:components.userDetails
          },
          {
            path:'changePassword',
            meta:{
              title:'修改密码'
            },
            component:components.changePassword
          },
          {
            path:'swiper',
            meta:{
              title:'轮播图列表'
            },
            component:components.swiper
          },
          {
            path:'books',
            meta:{
              title:'图书列表'
            },
            component:components.books
          },
      ]
    }
  ]
})
