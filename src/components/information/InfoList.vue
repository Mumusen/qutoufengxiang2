<template>
<div>
    <div class="ThemeList" v-if="infomationList && infomationList.success">
        <div class="dayContainer"  v-for="list in initInfoList">
            
            <div class="flag" v-if="list.date">
                
                <span>{{dateSplit(list.date)[1]}}月</span>
                <span>{{dateSplit(list.date)[2]}}</span>
            </div>
            <div class="row" style="margin:0;" v-for="info in list.infoMapList">
                <div class="col col-md-11 col-md-offset-1 unit">
                    <div class="dateArea">
                        <div class="time"><i></i><span>{{timeFormat(info.infomation.infomationTime)}}</span></div>
                        <div class="line"></div>
                    </div>
                    <div class="themeArea">
                        <div class="t-header">
                            <span v-if="info.conceptStockVo.infoName" @click="jumpThemeDetail(info.conceptStockVo.infoId)"> <a href="javascript:;" class="textRed">{{info.conceptStockVo.infoName}}</a></span>
                        </div>
                        <div class="t-content">
                            <p>
                                
                                <span>{{articleWordLimit(info.infomation.infomationContent)}}</span> 
                                <span class="lookMore" @click="jumpArticle(info.infomation.id)"><a href="javascript:;">查看更多</a></span>
                            </p>
                        </div>
                        <div class="t-footer">
                            <span v-for="stock in info.stockVoList" 
                                @click="jumpStockDetail({
                                    stockName: stock.infoName,
                                    stockCode: stock.infoCode
                                })"
                            >
                                <i></i>
                                <b>{{stock.infoName}}</b>
                                <b :class="stock.chg>=0?'textRed':'textGreen'">{{stock.chg>0?'+'+chgFormat(stock.chg)+'%':chgFormat(stock.chg)+'%'}}</b>
                            </span>
                            
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
        <!-- <div class="dayContainer">
            <div class="flag">
                <span>10月</span>
                <span>23</span>
            </div>
            <div class="row" style="margin:0;">
                <div class="col col-md-11 col-md-offset-1 unit">
                    <div class="dateArea">
                        <div class="time"><i></i><span>16:15</span></div>
                        <div class="line"></div>
                    </div>
                    <div class="themeArea">
                        <div class="t-header">
                            <span> <a href="javascript:;" class="textRed">保险</a></span>
                        </div>
                        <div class="t-content">
                            <p>
                                
                                <span>万向钱潮披露三季报，公司前三季度营收80.46亿元，净利6.22亿元，分别同比增长3.47%、0.06%，基本每股收益0.23元。股东名单方面，<a href="javascript:;" class="textRed" style="text-decoration:underline;">铝电池</a> 由1.92%升至2.19%，升至第二大股东，1.92%升至2.19%，升至第二大股东1.92%</span> 
                                <span class="lookMore"><a href="javascript:;">查看更多</a></span>
                            </p>
                        </div>
                        <div class="t-footer">
                            <span><i></i><b>中国重汽</b><b class="textRed">+1.13%</b></span>
                            <span><i></i><b>中国重汽</b><b class="textRed">+1.13%</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dayContainer">
            <div class="flag">
                <span>10月</span>
                <span>23</span>
            </div>
            <div class="row" style="margin:0;">
                <div class="col col-md-11 col-md-offset-1 unit">
                    <div class="dateArea">
                        <div class="time"><i></i><span>16:15</span></div>
                        <div class="line"></div>
                    </div>
                    <div class="themeArea">
                        <div class="t-header">
                            <span> <a href="javascript:;" class="textRed">保险</a></span>
                        </div>
                        <div class="t-content">
                            <p>
                                
                                <span>万向钱潮披露三季报，公司前三季度营收80.46亿元，净利6.22亿元，分别同比增长3.47%、0.06%，基本每股收益0.23元。股东名单方面，<a href="javascript:;" class="textRed" style="text-decoration:underline;">铝电池</a> 由1.92%升至2.19%，升至第二大股东，1.92%升至2.19%，升至第二大股东1.92%</span> 
                                <span class="lookMore"><a href="javascript:;">查看更多</a></span>
                            </p>
                        </div>
                        <div class="t-footer">
                            <span><i></i><b>中国重汽</b><b class="textRed">+1.13%</b></span>
                            <span><i></i><b>中国重汽</b><b class="textRed">+1.13%</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        
    
        
    </div>
    <div class="getMore">
        <span v-if="!isLoaded" @click="loadMore()">更多</span>
        <span v-if="isLoaded">没有更多的数据了。。。</span>
    </div>
    
</div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import '../../format';
export default {
    
    data(){
        return {
            isHaveInfoData: false,
            // 初始数据组
            initInfoList: [],
            // 是否加载完
            isLoaded: false,
            // 加载页码
            pageNo: 1
        }
    },
   
    computed:{
        ...mapGetters(['infomationList'])
    },

    watch: {
        'infomationList'(newVal, oldVal){
            console.log(newVal);
            if(oldVal && newVal){

                
                if(newVal.resultMap.existData){
                    this.initInfoList = [...this.initInfoList, ...newVal.resultMap.result];

                }else{
                    this.isLoaded = true;
                }

            }else{
                this.initInfoList = [...newVal.resultMap.result]
            }
        }
    },
    mounted(){
        // console.log(this.indexInfoArr);
        
    },
    methods: {
        ...mapActions(['getInfomationList']),
       
        // 文章字数限制
        articleWordLimit(str){
            
            return str.replace(/<[^>]+>/g,"").replace(/[&][l][t][;][\w\s\n\/]+[&][g][t][;]/g,"").replace(/[&][n][b][s][p][;]/g,"").slice(0, 100)+'...';
        },

        // 涨跌幅 格式
        chgFormat(num){
            return (parseFloat(num)).toFixed(2);
        },

        // 时间分割
        dateSplit(date){
            return date.split('-');
        },


        // 时间格式
        timeFormat(time){
            return (new Date(time)).format('hh:mm');
        },


        // 跳转股票详情页
        jumpStockDetail(obj){
            let {stockCode, stockName} = obj;
            
            
            // console.log(this.$route.path);
            this.$router.push({
                path: '/stockDetails',
                query: {
                    code: stockCode,
                    name: stockName
                }
            })
        },
        jumpThemeDetail(id){
            this.$router.push({
                path: '/themeDetails',
                query: {
                    id: id
                }
            })
        },


        // 加载更多
        loadMore(){
            this.getInfomationList({
                pageNo: ++this.pageNo
            })
        },

        // 查看文章详情
        jumpArticle(id){
            this.$router.push({
                path: '/article',
                query: {
                    id: id
                }
            })
        }
    }
}
</script>

