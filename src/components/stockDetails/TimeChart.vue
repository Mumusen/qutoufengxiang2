<template>
<div class="TimeChart">
    <div id="TimeCahrt" style="height: 220px;"></div>
    <div id="volumeChart" style="height: 170px;"></div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            // 时间组
            timeArr: [],
            // 每个时间段的 最新价格 组
            lastPriceArr: [],
            // 最新价
            newPrice: 0,
            // 均价组
            avgPriceArr: [],
            // 涨跌幅组
            chgArr: [],

            // 成交量
            volumeArr: [],
            // 记录上一次的成交量
            prevVolume: 0,
            // 记录下一次的成交量
            nextVolume: 0

        }
    },
    computed: {
        ...mapGetters(['stockBasicInfo', 'stockMinTime'])
    },
    watch:{
        // 'stockBasicInfo'(newVal, oldVal){
        //     console.log(newVal);
            
        // },
        'stockMinTime'(newVal, oldVal){
            
            this.handleData(this.stockMinTime);
            // console.log(this.newPrice);

            // console.log(this.chgArr)
            this.chartInit(this.stockBasicInfo.preclosePrice);
            // console.log(this.chgArr);
        }
    },

    mounted(){
    },

    methods: {
        chartInit(newPrice){
            // var yData = [15.01, 15.70, 16.71, 14.61, 15.85, 15.67, 16.76];
            // var newData = [];
            // for(var i=0; i<yData.length; i++){
            //     var upDown = ((yData[i] - 15.8)/15.8).toFixed(4);
            //     newData.push((upDown * 100).toFixed(2));
            // }

            let option = {
                
                tooltip: {
                    trigger: 'axis',
                                //  C23531 2F4554  61A0A8
                    formatter: function (params) {
                        // console.log(params);
                        
                        // params = params[0];
                        // var date = new Date(params.name);
                        return `${params[0].axisValueLabel} <br /> 
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#c23531;"></span>
                                价格  ${params[0].value}
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#2F4554;"></span>
                                涨跌幅  ${params[1].value}%
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#61A0A8;"></span>
                                均价  ${params[2].value}
                                <br />
                                `;
                    }
                },
                
                calculable : true,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '2%',
                    height: '180',
                    containLabel: true
                },
                
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: this.timeArr,
                    axisLine:{
                        show: true,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisTick:{
                        show: false
                    },
                    axisLabel: {
                        color: '#333'
                    },
                    splitLine: {
                        show: false,
                        
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        
                        axisLabel : {
                            formatter: '{value}',
                            color: function (value, index) {
                                return value < newPrice ? 'green' : 'red';
                            }
                        },
                        min: function(params){
                            // console.log((newPrice + (params.min * newPrice) / 100).toFixed(2));
                            // console.log(params);
                            // console.log((newPrice + (params.min * newPrice) / 100).toFixed(2));
                            // if(params.min < 0){
                            //     console.log((newPrice + (params.min) * newPrice).toFixed(2));
                                return  (newPrice + ((params.min-0.05) * newPrice) / 100).toFixed(2);
                            // }else{
                            //     console.log(newPrice);
                            //     return  newPrice;
                            // }
                        },
                        max: function(params){
                            // console.log(params);
                            return params.max;
                        },
                        axisLine:{
                            show: true,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisTick:{
                            show: false
                        },
                        splitLine: {
                            show: false,
                            
                        }
                    }
                    
                ],
                series : [
                    {
                        name:'价格',
                        type:'line',
                        // data:[15.81, 15.70, 16.81, 14.81, 15.85, 15.97, 16.56],
                        data: this.lastPriceArr,
                        
                        lineStyle: {

                            width: 1,
                        },
                        yAxisIndex: 0,
                        itemStyle: {
                            show: false,
                            borderWidth: 0
                        }
                        
                    },
                    {
                        name:'涨跌',
                        type:'line',
                        // data:newData,
                        data: this.chgArr,
                        lineStyle: {
                            color: 'rgba(0,0,0,0)',
                            opacity: 0
                        },
                        
                        yAxisIndex: 0
                    },
                    {
                        name:'均价',
                        type:'line',
                        lineStyle: {

                            width: 1,
                        },
                        // data:[15.71, 15.51, 15.31, 15.51, 15.81, 15.81, 15.81],
                        data: this.avgPriceArr,
                        
                        itemStyle: {
                            opacity: 0
                        }
                        
                    
                    }
                ]
            };



            let option2 = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top:'10%',
                    // bottom: '2%',
                    height: '100',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.timeArr,
                        // axisTick: {
                        //     alignWithLabel: true
                        // },
                        axisTick:{
                            show: false
                        },
                        axisLine:{
                            show: true,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel: {
                            show: false
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisTick:{
                            show: false
                        },
                        splitLine: {
                            show: false,
                            
                        },
                        axisLine:{
                            show: false,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: '#333'
                        }
                    }
                ],
                series : [
                    {
                        name:'成交量（手）',
                        type:'bar',
                        barWidth: '60%',
                        data: this.volumeArr,
                        smooth: true
                    }
                ]
            }

            let chart = this.$echarts.init(document.getElementById('TimeCahrt'));
            let chart2 = this.$echarts.init(document.getElementById('volumeChart'));

            chart.setOption(option);
            chart2.setOption(option2);
            
            this.$echarts.connect([chart, chart2]);
            // console.log(this.timeArr)
        },


        // date 时间组, lastPrice 最新价格组, avgPrice 均价组, chg 涨跌幅组
        handleData(data){
            // console.log(data);
            if(data && data.length !== 0){
                
                data.map((item, index)=>{
                    // 时间
                    let time =  `${item.mintime.slice(8,10)}:${item.mintime.slice(10,12)}`;
                    this.timeArr.push(time);

                    // 最新价
                    this.lastPriceArr.push(item.lastPrice);

                    // 均价
                    this.avgPriceArr.push(item.avgPrice);

                    // 涨跌幅
                    this.chgArr.push(item.changeRate.toFixed(2));

                    // 记录上一次的成交量
                    this.prevVolume = item.businessAmount;
                    // 记录下一次的成交量
                    this.nextVolume = data[index + 1]?data[index + 1].businessAmount:item.businessAmount;
                    // console.log(this.prevVolume);

                    // 成交量 （手）
                    if(index > 0 && index < data.length - 1){
                        this.volumeArr.push(
                            Math.floor(
                                (this.nextVolume - this.prevVolume) / 100
                            )
                        );
                    }else if(index === 0){
                        this.volumeArr.push(
                            Math.floor(
                                item.businessAmount / 100
                            )
                        );
                    }     
                });

                this.sumVolume(this.volumeArr);
                // console.log(this.timeArr.length);
            }   
        },

        // 计算
        sumVolume(arr){
            // console.log(arr.length);
            let sum = 0;
            arr.map((item) => {
                sum += item;
            });

            // console.log(sum);
        }
    }
}
</script>


