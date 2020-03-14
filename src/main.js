import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import { Lazyload } from 'vant';
import axios from 'axios'


axios.defaults.baseURL='http://111.231.145.104:8089/portal/'
//通过axios拦截器添加token验证
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('username')
    //最后必须return config
    return config
})
//每一个VUE的组件都可以通过this直接访问到$http从而发起axios请求
Vue.prototype.$http=axios
axios.defaults.withCredentials = true
Vue.use(Lazyload);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
