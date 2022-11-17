import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Loading} from 'element-ui';
let loadingInstance = null;
Vue.use(ElementUI);

import axios from 'axios'
// 配置axios
axios.defaults.baseURL = "http://localhost:3000"
Vue.prototype.$http = axios
axios.interceptors.request.use((config)=>{
  loadingInstance = Loading.service({fullscreen:true})
  return config
})

axios.interceptors.response.use((response)=>{
  loadingInstance.close()
  return response
})

Vue.config.productionTip = false

Vue.filter('dateFormat', (dtStr) => {
  const dt = new Date(dtStr)
  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())
  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

function padZero(n) {
  return n > 9 ? n : '0' + n;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
