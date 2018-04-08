<template>
  <section class="indexContainer">
      <!-- banner区域 -->
      <div class="bannerContainer">
          <div class="container QR">
              <!-- 二维码 -->
              <q-r-code></q-r-code>
          </div>
      </div>
      <div class="container contentContainer">
          <div class="briefTitle">
              <!-- 简略数据 -->
              <brief-title></brief-title>
          </div>
          <!-- 主题标题 -->
          <div class="themeTitle">
              <div class="row">
                  <div class="col col-md-6">
                      <theme-module></theme-module>
                  </div>
                  <div class="col col-md-6">
                      <theme-charts></theme-charts>
                  </div>
              </div>
          </div>
          <!-- 关注主题 -->
          <div class="followTheme">
              <follow-theme ></follow-theme>
          </div>

          <!-- 资讯 -->
          <div class="themeInfo">
              <theme-info></theme-info>
          </div>
        
      </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import QRCode from './QRCode';
import briefTitle from './BriefTitle';
import ThemeModule from './ThemeModule';
import ThemeCharts from './themeCharts';
import FollowTheme from './FollowTheme';
import ThemeInfo from './ThemeInfo';

import '../../format';


export default {
    data(){
        return {
            
        }
    },
    components: {
        QRCode,
        briefTitle,
        ThemeModule,
        ThemeCharts,
        FollowTheme,
        ThemeInfo
    },

    computed: {
        ...mapGetters(['currentInfo'])
    },
    watch: {
        // 'currentInfo'(newVal, oldVal){
        //     this.getInfoRelationTheme({id: newVal.id});
        // }
    },
    
    mounted(){
    

        // 进入 回到顶部
        if(this.$route.path === '/conIndex'){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        this.getIndexData();
        this.getLeadTheme({num: 3});
        this.getCapitalFlow();
        
    },
    // sockets:{
    //     connect: function(){
    //         console.log('this method was fired by the socket server')
    //     },
    //     newAlert: function(val){
    //         console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    //     },
    //     newAlert: function(data){
    //         alert("receive alert");
    //         console.log("receive alert..." + data.message);
    //     },
    //     disconnect: function() {
    //         alert("user disconnect");
    //         console.log("user disconnect");
    //     }

    // },

    methods: {
        ...mapActions(['getIndexData', 'getLeadTheme', 'getCapitalFlow', 'getInfoRelationTheme']),
        // sendMessage() {
        //     console.log("send message token");
        //     socket.emit('token', {
        //         token : '2',
        //         message : 'message token'
        //     });
        // }

        
    }
}
</script>