import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

import Scroller from '@/components/Scoller'
Vue.component('Scroller', Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

Vue.prototype.axios = axios

// 引入element-ui第三方组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 设置全局过滤器,处理请求的图片参数中有关WH的设置
Vue.filter('setWH', (url, arg) => {
   return url.replace(/w\.h/, arg)
})

Vue.config.productionTip = false

new Vue({
   el: '#app',
   router,
   store,
   render: h => h(App)
})