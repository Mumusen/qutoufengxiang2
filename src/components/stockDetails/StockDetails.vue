<template>
<section class="stockDetails">
    <div class="container">
        <div class="stockContainer">
            <stock-intro></stock-intro> 
        </div>

        <div class="chartContaienr">
            <div class="chart-l">

                <chart-left></chart-left>
            </div>
            <div class="chart-r">
                <chart-right></chart-right>
            </div>
        </div>
        
        <div class="departBusiness">
            <depar-business></depar-business>
        </div> 
        
    </div>
    
</section>
</template>

<script>
import stockIntro from './StockIntro';
import ChartLeft from './ChartLeft';
import ChartRight from './ChartRight';
import DeparBusiness from './DepartBusiness';
import { mapGetters, mapActions } from 'vuex';
export default {
    data(){
        return {
            
        }
    },

    components: {
        stockIntro,
        ChartLeft,
        ChartRight,
        DeparBusiness
    },

    computed:{
        ...mapGetters(['currentStock'])
    },

    watch:{
        '$route.query'(newVal, oldVal){
            location.reload();
        }
    },  

    mounted(){
          // 进入 回到顶部
        if(this.$route.path === '/stockDetails'){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        // console.log(this.$route.query)
        this.getStockDetails({
            stockCode: this.$route.query.code,
            marketCode: this.$route.query.marketCode?this.$route.query.marketCode:null
        });
        this.getKLineData({
            stockCode: this.$route.query.code,
            marketCode: this.$route.query.marketCode?this.$route.query.marketCode:null
        })
    },

    destroyed(){
        //  清除缓存
        this.clearDetails('stock');
    },

    methods: {
        ...mapActions(['getStockDetails', 'getKLineData', 'clearDetails'])
    }
}
</script>


