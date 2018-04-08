import axios from 'axios';
// import { Toast } from 'antd-mobile';

// 拦截请求

axios.interceptors.request.use(function(config){
    alert('loading...');
    // Toast.loading('加载中', 75);
    return config;
});

// 拦截响应

axios.interceptors.response.use(function(config){
    alert('loaded')
    // Toast.hide();


    return config;
});