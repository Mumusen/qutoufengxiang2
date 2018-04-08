<template>
<section class="investContainer">
  <div class="bannerContainer">
    <div class="container">
      <div class="themeTopContainer">
      
        
          <div style="width:50%">
            <theme-top :themeTopList="themeTopListUps"></theme-top>
          </div>
          <div style="width:50%">
            <theme-top :themeTopList="themeTopListDowns"></theme-top>
          </div>
        
      </div>
    </div>
    
  </div>
    
  <router-view></router-view>
</section>
</template>

<script>
import ThemeTop from './ThemeTop';
import { mapActions, mapGetters } from 'vuex';


export default {
  data(){
    return {
        themeTopListUps: { // 领涨主题
            title: '今日领涨主题',
            list: [
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#b71d00'  
                    } 
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#ff3c3c' 
                    }
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#ff3c3c' 
                    }
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#f10000' 
                    }
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#ff3c3c' 
                    }
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#ff3c3c' 
                    }
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#ff3c3c' 
                    }
                }
            ]
        },
        themeTopListDowns: { //  领跌主题  
            title: '今日领跌主题',
            list: [
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#4e9039'
                    } 
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#7faf71'
                    }
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#7faf71'
                    }
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#68a54a'
                    }
                },
                {    
                    name: '',
                    data: '',
                    style: {
                        background: '#7faf71'  
                    }
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#7faf71' 
                    }
                },
                {
                    name: '',
                    data: '',
                    style: {
                        background: '#7faf71'
                         
                    }
                }
            ]
        },
        
    }
  },

  computed:{
      ...mapGetters(['leadTheme']),
   
  },
  watch:{
      'leadTheme'(newVal, oldVal){
          this.handleDataSoon(this.leadTheme);
      }
  },
  

  components: {
    ThemeTop,
    
  },

  mounted(){
      // 进入 回到顶部
    if(this.$route.path === '/invest'){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    this.getLeadTheme({
        num: 7
    });

    
  },

  methods: {
        ...mapActions(['getLeadTheme']),

        // 处理数据
        handleDataSoon(data){
            let upColorArr = ['#b71d00', '#ff3c3c', '#ff3c3c', '#f10000', '#ff3c3c', '#ff3c3c', '#ff3c3c'];
            let downColorArr = ['#4e9039', '#7faf71', '#7faf71', '#68a54a', '#7faf71', '#7faf71', '#7faf71'];
            let upArr = [];
            let downArr = [];
            if(data.leadUpTheme && data.leadDownTheme){
                // 拿到领涨 领跌数据
                let upTheme = data.leadUpTheme; 
                let downTheme = data.leadDownTheme;
                // 处理领涨
                upTheme.map((item, index) => {
                    let obj = {};
                    // 主题名称
                    obj.name = item.conceptStockName;
                    // 主题数据
                    obj.data = item.chg + '%';
                    // 主题ID
                    obj.id = item.id;
                    // 主题样式
                    obj.style = {
                        background: upColorArr[index]
                    }

                    upArr.push(obj);
                });
                // 处理领跌
                downTheme.map((item, index) => {
                    let obj = {};
                    // 主题名称
                    obj.name = item.conceptStockName;
                    // 主题数据
                    obj.data = item.chg + '%';
                    // 主题ID
                    obj.id = item.id;
                     // 主题样式
                    obj.style = {
                        background: downColorArr[index]
                    }

                    downArr.push(obj);
                });

                this.themeTopListUps.list = upArr;
                this.themeTopListDowns.list = downArr;
            }
        } 
  }
}
</script>
