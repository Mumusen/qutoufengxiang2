// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'
import router from './router'
import jQuery from 'jquery'
// import Zepto from 'webpack-zepto'
import ECharts from 'echarts'

import store from './vuex/store';
import VueSocketio from 'vue-socket.io';
//技巧 同时 use 多个插件 被依赖的插件应放在偏后方
Vue.use(Vuex);
// Vue.use(VueSocketio, 'http://localhost:8089');
Vue.prototype.$VueAxios=VueAxios;

Vue.config.productionTip = false;
Vue.prototype.$echarts = ECharts;

Vue.prototype.globalClick = function(callback){
    $(document).click(callback);
}

require('!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('!style-loader!css-loader!font-awesome/css/font-awesome.min.css');
// require('!style-loader!css-loader!../static/css/index.css');
// import 'bootstrap.min.css';
import '../static/css/index.css';

import Util from './util'; // 工具
// import './config';

/* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })


