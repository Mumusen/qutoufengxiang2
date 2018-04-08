<template>
<table class="billBoardTable">
    <thead>
        <tr>
            <th v-for="head in billBoardTable.thead">{{head}}</th>
            <!-- <th>合计买入(亿)</th>
            <th>合计卖出(亿)</th>
            <th>净买入(亿)</th>
            <th>涨跌幅</th>
            <th>上榜家数</th>
            <th>上榜个股</th> -->
        </tr>
    </thead>
    <tbody>
        <tr v-for="body in billBoardTable.tbody">
            <td><span><router-link :to="'/themeDetails?id='+body.id">{{body.conceptName}}</router-link> </span></td>
            <td class="textRed">{{ formatMoney(body.inAmount) }}</td>
            <td class="textRed">{{formatMoney(body.outAmount)}}</td>
            <td :class="body.netAmount>=0?'textRed':'textGreen'">{{formatMoney(body.netAmount)}}</td>
            <td :class="body.changeRate>=0?'textRed':'textGreen'">
                {{ body.changeRate === 0?0: body.changeRate + '%'}}
            </td>
            <td>{{body.heroCount}}</td>
            <td>
                <span v-for="stock in body.maxStockList">
                    <router-link :to="'/stockDetails?code='+stock.stockCode+'&name='+stock.stockName">

                        {{stock.stockName}}
                    </router-link>
                </span>
                <!-- <span>江西铜业</span>
                <span>江西铜业</span> -->
            </td>
        </tr>
        <!-- <tr>
            <td><span>有色金属</span></td>
            <td>1.45</td>
            <td>1.42</td>
            <td>0.03</td>
            <td>1.3%</td>
            <td>3</td>
            <td>
                <span>江西铜业</span>
                <span>江西铜业</span>
                <span>江西铜业</span>
            </td>
        </tr> -->
        
    </tbody>
</table>
</template>

<script>
import Util from '../../util';
export default {
    props: ["billBoardTable"],
    data(){
        return {
            
        }
    },

    mounted(){
        // console.log(this.billBoardTable);
    },
    methods: {
        formatMoney(num){
            // console.log(num);
            let money = parseFloat(num);
            let forMoney = 0;
            forMoney = (money / 100000000).toFixed(2);      
            return forMoney;
        }
    }
    
}
</script>
