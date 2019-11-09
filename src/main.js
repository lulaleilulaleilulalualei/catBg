import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from './assets/js/api.js'
import config from './config.js'
import Antd from 'ant-design-vue';
import vuescroll from 'vuescroll';
import md5 from 'js-md5';
import VueQuillEditor from 'vue-quill-editor'
import VueDND from 'awe-dnd'
import echarts from "echarts"
import Print from 'vue-print-nb'
import browserVer from './assets/js/browser.js'
import homeRouter from './assets/js/routerUtil.js'

import 'ant-design-vue/dist/antd.css';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/css/project.css'

import * as Quill from 'quill' //引入编辑器
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageDrop', ImageDrop);

Vue.use(Antd);
Vue.use(VueQuillEditor)
Vue.use(VueDND)
Vue.use(Print);
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#cecece'
    }
  }, // 在这里设置全局默认配置
});

Vue.config.productionTip = false;

Vue.prototype.$api = api
Vue.prototype.$config = config
Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts

router.beforeEach((to, from, next) => {
  if(from.path == '/login') {
    if(!homeRouter.getRouterArr.isRepeatLoad) {
      homeRouter.getRouterArr.getRouter((routers) => {
        homeRouter.getRouterArr.isRepeatLoad = true
        router.options.routes.push(...routers)
        router.addRoutes(routers)
      })
      next()
    }else {
      next()
    }
  }else {
    next()
  }
})

router.afterEach((to, from) => {
  store._actions.c_saveRouteStatus[0](to)
  if(from.path != '/' && to.path == '/login') {
    window.location.reload()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
