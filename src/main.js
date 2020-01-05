import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.axios = axios

// 设置全局过滤器,处理请求的图片参数中有关WH的设置
Vue.filter('setWH',(url,arg) => {
   return url.replace(/w\.h/,arg)
})

Vue.config.productionTip = false

new Vue({
   el: '#app',
   router,
   render: h => h(App)
})
