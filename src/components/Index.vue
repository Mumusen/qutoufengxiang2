<template>
  <div class="IndexContainer">
      <com-header :styleCls="headerStyle"></com-header>
      
          <router-view></router-view>
      
      <com-footer></com-footer>
        <div class="container sideBarContainer">

            <side-nav-bar></side-nav-bar>
        </div>
  </div>
</template>

<script>
import comHeader from './indexComponents/Header';
import comFooter from './indexComponents/Footer';
import SideNavBar from './indexComponents/SideNavBar';
export default {
    name: 'Index',
    data(){
        return{
            headerStyle:{},
            scrolled: false,
        }
    },
    components: {
        comHeader,
        comFooter,
        SideNavBar
    },
    mounted(){
        
        this.storgeOverTime();

        // 储存历史记录
        let query_history = sessionStorage.getItem('query_history');
        query_history?null:sessionStorage.setItem('query_history', JSON.stringify([]))
        
    },
    watch: {
        $route(){

            let path = this.$route.path;
            // console.log(path);
            if(path === '/conIndex' || path === '/invest' || path === '/invest/investCon' || path === '/invest/themeSearch'){
                window.addEventListener('scroll', this.handleScrolled);
                
            }else{
                window.removeEventListener('scroll', this.handleScrolled);
                this.headerStyle = {
                    background: 'rgba(27,31,39,1)'
                }
            }

        }
    },
    methods: {
        handleScrolled(){
            let scrollY = window.scrollY || window.pageYOffset
            this.scrolled = scrollY > 50;
            
            if(this.scrolled){
                this.headerStyle = {
                    background: 'rgba(27,31,39,1)'
                }
                
            }else{
                this.headerStyle = {
                    background: 'rgba(27,31,39,0)'
                }
            }
        },

        // 检测localStorge是否储存的时间超时  超过7天
        storgeOverTime(){
            // 储存时候的 时间戳
            let saveTime = (new Date(localStorage.getItem('loginTime'))).getTime();
            // 现在的时间戳
            let nowTime = (new Date()).getTime();

            let differ = nowTime - saveTime;

            // console.log(differ);

            if(differ < 7 * 24 * 3600 * 1000){
                // console.log('未超过');
                // 更新登录时间
                localStorage.setItem('loginTime', new Date());

            }else{
                // console.log('已经超时');
                // 删除 qutouPhone loginTime
                localStorage.removeItem('qutouPhone');
                localStorage.removeItem('loginTime');

            }

        }
    }
}
</script>