import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
 
import 'element-ui/lib/theme-chalk/index.css';

 
// element-ui
import Element from 'element-ui'
// import './element-variables.scss'

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import echarts from 'echarts'
import './utils/directives.js'
// 引入表格组件
import PageTable from "@/components/PageTable/index.vue";
import Pagination from "@/components/Pagination/index.vue";
// 全局挂载可选列表格
Vue.component('PageTable',PageTable)
Vue.component('Pagination',Pagination)


Vue.prototype.$echarts = echarts //全局注册，使用方法为:this.$echarts
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios

Vue.use(Element)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
