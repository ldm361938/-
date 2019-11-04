import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Home.vue'
import Users from '../components/user/Users.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/login'},
    {path:'/login',component:Login},
    {path:'/home',component:Home,children:[
      {path:'/welcome',component:Welcome},
      {path:'/users',component:Users}
    ]},
   
  ]
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// a路由向b路由跳转前执行
// form ... to ...
// 导航守卫
router.beforeEach(function(to,from,next){
 if(to.path=='/login') return next()
 let tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})
export default router
