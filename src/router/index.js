import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const components = {
  login:()=> import('@/views/login/login'),
  layout:()=> import ('@/views/layout/layout'),
  index:()=> import('@/views/index/index'),
  books:()=> import('@/views/books/bookList'),
  category:()=> import('@/views/category/category'),
  addCategory:()=> import('@/views/category/addCategory'),
  editCategory:()=> import('@/views/category/editCategory'),
  booksIncategory:()=> import('@/views/category/booksIncategory'),
  addBook:()=> import('@/views/books/addBook'),
  bookCategory:()=> import('@/views/books/bookCategory'),
  editBook:()=> import('@/views/books/editBook'),
  swiper:()=> import('@/views/swiper/index'),
  addSwipers:()=> import('@/views/swiper/addSwipers'),
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
          {
            path:'addBook',
            meta:{
              title:'添加图书'
            },
            component:components.addBook
          },
          {
            name:'editBook',
            path:'editBook',
            meta:{
              title:'编辑图书'
            },
            component:components.editBook
          },
          {
            name:'bookCategory',
            path:'bookCategory',
            meta:{
              title:'给图书添加分类'
            },
            component:components.bookCategory
          },
          {
            path:'addSwipers',
            name:'addSwipers',
            meta:{
              title:'添加轮播图'
            },
            component:components.addSwipers
          },
          {
            path:'editSwipers',
            name:'editSwipers',
            meta:{
              title:'编辑轮播图'
            },
            component:components.addSwipers
          },
          {
            path:'category',
            name:'category',
            meta:{
              title:'分类列表'
            },
            component:components.category
          },
          {
            path:'addCategory',
            name:'addCategory',
            meta:{
              title:'添加分类'
            },
            component:components.addCategory
          },
          {
            path:'editCategory',
            name:'editCategory',
            meta:{
              title:'编辑分类'
            },
            component:components.editCategory
          },
          {
            path:'booksIncategory',
            name:'booksIncategory',
            meta:{
              title:'分类下的书籍'
            },
            component:components.booksIncategory
          },
      ]
    }
  ]
})
