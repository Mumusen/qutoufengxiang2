<template>
<div class="businessContainer">
    <div class="changeCol">
        <ul>
            <li :class="queryType === '1'?'active':''" @click="checkType('1')">5日</li>
            <li :class="queryType === '2'?'active':''" @click="checkType('2')">10日</li>
            <li :class="queryType === '3'?'active':''" @click="checkType('3')">1个月</li>
            <li :class="queryType === '4'?'active':''" @click="checkType('4')">3个月</li>
        </ul>
    </div>
    <div class="tableContainer">
        <table>
            <thead>
                <tr>
                    <th>参与个股数量</th>
                    <th>上榜股票名称</th>
                    <th>参与次数</th>
                    <th>五日合计买入(万)</th>
                    <th>五日合计卖出(万)</th>
                    <th>净买入(万)</th>
                    <!-- <th>参与时间</th> -->
                </tr>
            </thead>
            <tbody v-if="departmentTypeStockList && stockList.len">
                <tr>
                    <td :rowspan="stockList.len" style="background: #fff;border-right: 1px solid #dedede;border-bottom: 1px solid #dedede">
                        {{stockList.len}}支
                    </td>
                    <td> 
                        <router-link
                            :to="'/stockDetails?name='+stockList.firstData.stockName+'&code='+stockList.firstData.stockCode"
                        >{{stockList.firstData.stockName}}</router-link></td>
                    <td>{{stockList.firstData.on_the_list_num}}</td>
                    <td>{{stockList.firstData.buy_sum}}</td>
                    <td>{{stockList.firstData.sale_sum}}</td>
                    <td :class="stockList.firstData.net_buy_sum >= 0?'textRed':'textGreen'">
                        {{stockList.firstData.net_buy_sum}}
                    </td>
                    
                </tr>
                <tr v-for="stock in stockList.data">
                    
                    <td> 
                        <router-link
                            :to="'/stockDetails?name='+stock.stockName+'&code='+stock.stockCode"
                        >{{stock.stockName}}</router-link></td>
                    <td>{{stock.on_the_list_num}}</td>
                    <td>{{stock.buy_sum}}</td>
                    <td>{{stock.sale_sum}}</td>
                    <td :class="stock.net_buy_sum >= 0?'textRed':'textGreen'">{{stock.net_buy_sum}}</td>
                    
                </tr>
                <!--
                <tr>
                
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>5</td>
                    <td>425.15万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                    <td>11/8</td>
                </tr>
                <tr style="border-bottom: 1px solid #dedede;">
                    
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>5</td>
                    <td>425.15万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                    <td>11/8</td>
                </tr> -->
            </tbody>
            
        </table>
    </div>
    

    <div class="historyPageContainer" v-if="stockList.len > 10">
        <button class="pervPage" @click="pervPage">上一页</button>
        <button class="nextPage" @click="nextPage">下一页</button>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageSelect from '../themeInvestment/PageSelect';
export default {
    name: 'BusinessDetail',
    data(){
        return {
            // totalNum: 1,
            // pageSize: 10,
            // 当前页面
            currentPage: 1,
            // 储存查询类型 1：近五日 2：近十日 3：近1个月 4：近3个月 5：近半年 6：近一年（不传默认1）7:近三日 8：近一日
            queryType: '1',
            // 渲染数据
            stockList: {}
            // {
                // len: 4,
                // firstData: {
                //     stockName: '',
                //     stockCode: '',
                //     buy_sum: '',
                //     sale_sum: '',
                //     net_buy_sum: ''
                // },
                // data: [
                //     {
                //         stockName: '',
                //         stockCode: '',
                //         buy_num: '',
                //         sale_sum: '',
                //         net_buy_sum: ''
                //     }
                // ]
            // }
        }
    },
    components:{
        PageSelect
    },

    computed: {
        ...mapGetters(['departmentTypeStockList'])
    },

    watch: {
        'departmentTypeStockList'(newVal, oldVal){
            // console.log(newVal);

            this.dataHandleStockList(newVal.stockList, newVal.secu_num);
            this.totalNum = parseInt(newVal.secu_num);
        }
    },

    mounted(){
        this.getDepartmentTypeStockList({
            bo_code: this.$route.query.id
            
        })
    },

    methods: {
        ...mapActions(['getDepartmentTypeStockList']),
        
        // 股票列表数据处理
        dataHandleStockList(data, len){
            this.stockList.len = len?len:0;
            if(data && data.length !== 0){
                let arr = [];
                data.map((item, index) => {

                    if(index === 0){
                        let obj = {
                            on_the_list_num: item.on_the_list_num,
                            stockName: item.secu_abbr,
                            stockCode: item.stockCode,
                            buy_sum: (parseFloat(item.buy_sum)).toFixed(2) ,
                            sale_sum: (parseFloat(item.sale_sum)).toFixed(2) ,
                            net_buy_sum: (parseFloat(item.buy_sum - item.sale_sum)).toFixed(2) 
                        }
                        this.stockList.firstData = obj;
                    }else{
                        let obj = {
                            on_the_list_num: item.on_the_list_num,
                            stockName: item.secu_abbr,
                            stockCode: item.stockCode,
                            buy_sum: (parseFloat(item.buy_sum)).toFixed(2) ,
                            sale_sum: (parseFloat(item.sale_sum)).toFixed(2) ,
                            net_buy_sum: (parseFloat(item.buy_sum - item.sale_sum)).toFixed(2) 
                        }
                        arr.push(obj);
                    }
                });

                this.stockList.data = arr;
                // console.log(this.stockList);
            }
        },

        // 切换类型
        checkType(type){
            this.getDepartmentTypeStockList({
                bo_code: this.$route.query.id,
                type: type
            });
            this.queryType = type;
        },
        // 上一页
        pervPage(){
            if(this.currentPage >= 1){
                this.getDepartmentTypeStockList({
                    type: this.queryType,
                    bo_code: this.$route.query.id,
                    page_no: --this.currentPage
                });
            }
            
        },
        // 下一页
        nextPage(){
            
            this.currentPage++;
            if(this.currentPage <= Math.ceil(this.stockList.len / 10)){
                this.getDepartmentTypeStockList({
                    type: this.queryType,
                    bo_code: this.$route.query.id,
                    page_no: this.currentPage
                });
            }else{
                this.currentPage--;
                console.log(this.currentPage);
            }
                
           
        }
    }
}
</script>

