<template>
<div class="themeInfoContainer">
    <div class="followTitle">
        <span>资讯</span>
        <b><router-link to="/information">更多 ></router-link></b>
        
    </div>
    <div class="infoContent">
        
        <div class="row ThemeList" style="margin:0;">
            
            
            <div class="col col-md-7" style="padding:0;">
                
                <info-list :indexInfomation="infomations"></info-list>
                
                
            </div>
            <div class="col col-md-5 loading-view" style="padding:0;">
                <theme-details></theme-details>
            </div>
            
        </div>
        
        
        
    </div>
    
    
</div>
</template>

<script>
import ThemeDetails from './themeDetails/ThemeDetails';
import InfoList from './InfoList';

import { mapGetters, mapActions } from 'vuex';
export default {    
    data(){
        return {
           infomations: null,  // 传给组件的数据

            timeArr: []   // 当前资讯时间
        }
    },
    computed:{
        ...mapGetters(['indexInfomation'])
    },

    watch: {
        'indexInfomation'(newVal, oldVal){
            this.infomations = this.handleData(newVal);
        }
    },
    mounted(){
        // this.handleArry();
        this.infomations = this.handleData(this.indexInfomation);
        // console.log(this.infomations);
    },
    components: {
        ThemeDetails,
        InfoList
    },
    methods: {
        ...mapActions([
            'saveIndexInfoArr', 
            'saveCurrentInfo', 
            'getInfoRelationTheme', 
            'getRelationThemeQuo', 
            'saveCurrentTheme'
        ]),
        // 数据处理 
        handleData(data){
            // 
            let arr = [];
            // 资讯id信息组
            let infoArr = []
            data?data.map( item => {

                // 重组数据结构
                let obj = {
                    id: item.id,
                    infomationName: item.infomationName,
                    date: {
                        year: (new Date(item.infomationTime)).getFullYear(),
                        month: (new Date(item.infomationTime)).getMonth() + 1,
                        day: (new Date(item.infomationTime)).getDate(),
                        hour: (new Date(item.infomationTime)).getHours(),
                        minute: (new Date(item.infomationTime)).getMinutes() > 9?(new Date(item.infomationTime)).getMinutes(): '0' + (new Date(item.infomationTime)).getMinutes(),
                        // 判断最近的两次时间是否属于同一天  
                        isSame: (new Date(item.infomationTime)).getMonth() + 1 === this.timeArr[0] 
                                && (new Date(item.infomationTime)).getDate() === this.timeArr[1] 
                    },
                    infomationContent: item.infomationContent,
                    stockDetails: this.stockDataArr(item.stockDetails),
                    conceptStockInfo: item.conceptStockInfoVo?item.conceptStockInfoVo:null

                };

                let infoObj = {
                    id: item.id,
                    infoName: item.infomationName
                }

                

                // 储存上一次时间
                this.timeContrast(item.infomationTime);
                // console.log(this.timeArr);

                arr.push(obj);

                infoArr.push(infoObj);
            }):null;

            
            this.saveIndexInfoArr(infoArr); // 储存在state中

            // 储存当前资讯ID  发起请求  getInfoRelationTheme
            if(data && data.length!==0){
                // 储存当前资讯ID
                this.saveCurrentInfo({
                    id: data[0].id, 
                    infoName: data[0].infomationName
                });
                // 发起请求  发起资讯关联主题
                this.getInfoRelationTheme({
                    informationId: data[0].id
                });
                // 发起请求  主题行情
                // console.log(data[0])
                if(data[0].conceptStockInfoVo){
                    this.getRelationThemeQuo({
                        conceptStockId: data[0].conceptStockInfoVo.id
                    });
                    // 储存当前主题ID
                    this.saveCurrentTheme({
                        id: data[0].conceptStockInfoVo.id,
                        themeName: data[0].conceptStockInfoVo.conceptStockName
                    })
                }
                
                
            }
            
            return arr;
        },

        // 股票数组  处理
        stockDataArr(data){
            let arr = [];
            data.map((item) => {
                let obj = {
                    stockName: item.stockName,
                    stockCode: item.stockCode,
                    changeRate: item.changeRate,
                    associateStockId: item.associateStockId
                }

                arr.push(obj);
            });

            return arr;
        },

        // 时间对比 储存
        timeContrast(date){
            // console.log(date);
            this.timeArr = [
                (new Date(date)).getMonth() + 1, 
                (new Date(date)).getDate()
            ];   //[ 'month', 'day']
        }
    }
}
</script>

