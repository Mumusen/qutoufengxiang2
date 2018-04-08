<template>
    <div class="tableContainer" v-if="stockDetail_billboard">
        <h1><span>上榜理由：</span><b>{{stockDetail_billboard.result}}</b></h1>
        <table>
            <thead>
                <tr>
                    <th>买入营业部</th>
                    <th>买入金额</th>
                    <th>卖出营业部</th>
                    <th>卖出金额</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(buy,index) in stockDetail_billboard.buys">
                    <td v-if="buy.boCode !== '--' && buy.boCode !== '21789'"><router-link :to="'departmentDetail?id='+buy.boCode">{{buy.departmentName}}</router-link></td>
                    <!-- 判断是否是机构专用  如果是  不加链接 -->
                    <td v-if="buy.boCode === '--' || buy.boCode === '21789'"><span>{{buy.departmentName}}</span></td>
                    <td><span class="textRed">{{buy.in}}</span></span></td>
                    <td v-if="stockDetail_billboard.sales[index].boCode !== '--' && stockDetail_billboard.sales[index].boCode !== '21789'">
                        <router-link :to="'departmentDetail/history?id='+stockDetail_billboard.sales[index].boCode">{{buy.departmentName}}</router-link>
                    </td>
                    <!-- 判断是否是机构专用  如果是  不加链接 -->
                    <td v-if="stockDetail_billboard.sales[index].boCode === '--' || stockDetail_billboard.sales[index].boCode === '21789' "><span>{{stockDetail_billboard.sales[index].departmentName}}</span></td>
                    <td><span class="textGreen">{{stockDetail_billboard.sales[index].in}}</span></td>
                </tr>
                <!-- <tr>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">2199.57</span>/<span class="textGreen">0.00</span></td>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">0.00</span>/<span class="textGreen">2199.57</span></td>
                </tr>
                <tr>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">2199.57</span>/<span class="textGreen">0.00</span></td>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">0.00</span>/<span class="textGreen">2199.57</span></td>
                </tr>
                <tr>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">2199.57</span>/<span class="textGreen">0.00</span></td>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">0.00</span>/<span class="textGreen">2199.57</span></td>
                </tr>
                <tr>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">2199.57</span>/<span class="textGreen">0.00</span></td>
                    <td><b>华鑫证券有限责任公司北京菜市口大街证券营业部</b></td>
                    <td><span class="textRed">0.00</span>/<span class="textGreen">2199.57</span></td>
                </tr> -->
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {

        }
    },
    watch: {
        // 'stockDetail_billboard'(newVal, oldVal){
        //     console.log(newVal);
        // }
    },

    computed:{
        ...mapGetters(['stockDetail_billboard'])
    },

    mounted(){
        
    }


}
</script>

