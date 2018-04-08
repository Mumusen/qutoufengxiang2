<template>
<div class="departTable">
    <div class="departTitle">
        <label-title :title="departCol"></label-title>
        <div class="departDate" v-if="stockDateArr">
            <span><b>{{stockDateArr[0]}}</b> <i></i></span>
            <ul>
                <li v-for="date in stockDateArr" @click="changeDate(date)">{{date}}</li>
                <!-- <li>2016-07-07</li> -->
                <!-- <li>2016-07-08</li>
                <li>2016-07-09</li>
                <li>2016-07-10</li>
                <li>2016-07-15</li>
                <li>2016-07-05</li>
                <li>2016-07-07</li>
                <li>2016-07-08</li>
                <li>2016-07-09</li>
                <li>2016-07-10</li>
                <li>2016-07-15</li> -->
            </ul>
        </div>
    </div>
    <depart-table-detail></depart-table-detail>
    
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LabelTitle from '../indexComponents/themeDetails/Label';
import DepartTableDetail from './DepartTableDetail';
import '../../format';
export default {
    data(){
        return {
            departCol: '龙虎榜单'
        }
    },

    watch: {
        'stockDateArr'(newVal, oldVal){
            // console.log(newVal);
            
            this.getStockDetail_billboard({
                stockCode: this.$route.query.code,
                dateStr: this.stockDateArr[0]
            });
            
            // console.log(this.stockDetail_billboard);
        }
        
        
    },

    components: {
        LabelTitle,
        DepartTableDetail
    },

    mounted(){
        // this.getStockDetail_billboard({
        //     stockCode: this.$route.query.code
            
        // });
    },

    computed: {
        ...mapGetters(['stockDateArr'])
    },

    methods:{
        ...mapActions(['getStockDetail_billboard']),
        changeDate(date){
            this.getStockDetail_billboard({
                stockCode: this.$route.query.code,
                dateStr: date
            })
        }
    }
}
</script>

