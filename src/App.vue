<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {

    }
  },

  mounted(){
    // this.checkBrowserVersion();
  },

  methods: {
    // 浏览器版本检测
    // checkBrowserVersion(){
    //   var ua = navigator.userAgent.toLowerCase();
    //   var version = ua.match(/msie ([\d.]+)/)?ua.match(/msie ([\d.]+)/)[1]:0;
    //   // console.log(version);
      
      
    //   // alert('ie 8');
    //   if(ua.indexOf('ie') > -1 && parseFloat(version) <= 8){
    //     $('body').html('<div class="upgrad-browser"></div>');
    //   }
    // }

    
  }
}
</script>

<style>
  
</style>
