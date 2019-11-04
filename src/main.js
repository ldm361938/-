import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 全局样式表
import './assets/css/global.css'
// 字体图标
import './assets/fonts/iconfont.css'



// 导入axios
import axios from 'axios'
// 配置环境
axios.defaults.baseURL='https://www.liulongbin.top:8888/api/private/v1/'

//axios拦截器是为了复用代码，把每个ajax都要设置的头信息提取到拦截器当中

// axios 拦截器
axios.interceptors.request.use(function(config){
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config;
})
Vue.prototype.$http= axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
