<template>
<div>
    <div class="introDeatil">
        <ul v-if="themeUpDownCount">
            <li>上涨家数：{{themeUpDownCount.riseCount}}</li>
            <li>下跌家数：{{themeUpDownCount.fallCount}}</li>
            <li>平盘家数：{{themeUpDownCount.territoryCount}}</li>
            <li>停牌家数：{{themeUpDownCount.breakCount}}</li>
        </ul>
    </div>
    <div class="chartArea">
                            
        <div id="upDownNums" style="width:390px;height:220px;"></div>

        <!-- <div class="lengend">
            <ul>
                <li><i></i><span>上涨家数</span></li>
                <li><i></i><span>下跌家数</span></li>
                <li><i></i><span>平盘家数</span></li>
                <li><i></i><span>停牌家数</span></li>
            </ul>
        </div> -->
    </div>
</div>


</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {

        }
    },

    mounted(){
        this.chartInit();
    },

    computed: {
        ...mapGetters(['themeUpDownCount'])
    },

    watch: {
        'themeUpDownCount'(newVal, oldVal){
            // console.log(newVal);
            this.chartInit(newVal);
        }
    },  

    methods: {
        chartInit(data){
            let option = {
                color: ["#0098d9", "#c12e34", "#e6b600", "#2b821d"],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                
                series : [
                    {
                        name: '涨跌家数',
                        type: 'pie',
                        radius : '70%',
                        center: ['50%', '60%'],
                        data: data?[
                            {value: data.riseCount, name:'上涨家数'},
                            {value: data.fallCount, name:'下跌家数'},
                            {value: data.territoryCount, name:'平盘家数'},
                            {value: data.breakCount, name:'停牌家数'}
                        ]:[],
                        // [
                        //     {value:12, name:'上涨家数'},
                        //     {value:5, name:'下跌家数'},
                        //     {value:1, name:'平盘家数'},
                        //     {value:1, name:'停牌家数'}
                        // ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 5,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };


            let Chart = this.$echarts.init(document.getElementById('upDownNums'));

            Chart.setOption(option);

        },

        
    }
}
</script>
