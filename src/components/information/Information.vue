<template>
<section class="information">
    <div class="container informationContainer">
        <div class="infoContainer">
            
            <info-list></info-list>
        </div>
        <div class="themeContainer">
            <!-- 今日流入主题 -->
            <div class="newEnterTheme">
                <theme-label :title="newEnterTitle"></theme-label>
                <div class="tableContainer">

                    <invest-table :capitalTableInfo="newEnterTheme"></invest-table>
                    
                </div>
                
            </div>
            <!-- 今日资金流出主题 -->
            <div class="newExitTheme">
                <theme-label :title="newExitTitle"></theme-label>
                <div class="tableContainer">

                    <invest-table :capitalTableInfo="newExitTheme"></invest-table>
                
                </div>
                
            </div>
            <!-- 近五日资金流入主题 -->
            <div class="recentEnterTheme">
                <theme-label :title="recentEnterTitle"></theme-label>
                <div class="tableContainer">

                    <invest-table :capitalTableInfo="recentEnterTheme"></invest-table>
                
                </div>
                
            </div>

            <!-- 近五日资金流出主题 -->
            <div class="recentExitTheme">
                <theme-label :title="recentExitTitle"></theme-label>
                <div class="tableContainer">

                    <invest-table :capitalTableInfo="recentExitTheme"></invest-table>
                    
                </div>
                
            </div>
        </div>
    </div>
    
</section>
</template>

<script>
import InfoList from './InfoList';
import themeLabel from '../indexComponents/themeDetails/Label';
import InvestTable from '../themeInvestment/InvestTable';
import { mapGetters, mapActions } from 'vuex';
import Util from '../../util';
export default {
    data(){
        return {
            newEnterTitle: '今日资金流入主题',
            newExitTitle: '今日资金流出主题',
            recentEnterTitle: '近五日资金流入主题',
            recentExitTitle: '近五日资金流出主题',
            newEnterTheme: {// 今日资金流入主题 
                textStyle:{
                    textRed: true,
                    textGreen: false
                },
                thead: ["主题名称", "资金流入(亿)", "涨幅"],
                tbody: [
                    {
                        id: 0,
                        itemName: '',
                        items: ["", ""]
                    }
                    
                    
                    
                ]
            },
            newExitTheme: {// 今日资金流入主题 recentEnterTheme
                textStyle:{
                    textRed: true,
                    textGreen: false
                },
                thead: ["主题名称", "资金流出(亿)", "涨幅"],
                tbody: [
                    
                    
                    {
                        id: 0,
                        itemName: '',
                        items: ["", ""]
                    }
                    
                    
                ]
            },
            recentEnterTheme: {// 近五日资金流入主题 
                textStyle:{
                    textRed: true,
                    textGreen: false
                },
                thead: ["主题名称", "资金流入(亿)", "涨幅"],
                tbody: [
                    
                    {
                        id: 0,
                        itemName: '',
                        items: ["", ""]
                    }
                    
                    
                ]
            },
            recentExitTheme: {// 近五日资金流入主题 
                textStyle:{
                    textRed: false,
                    textGreen: true
                },
                thead: ["主题名称", "资金流出(亿)", "涨幅"],
                tbody: [
                    
                    {
                        id: 0,
                        itemName: '',
                        items: ["", ""]
                    }
                    
                    
                ]
            }
        }
    },

    components: {
        InfoList,
        themeLabel,
        InvestTable
    },

    watch: {
        // 资金流入流出
        'todayInvestInflow'(newVal, oldVal){
            this.newEnterTheme.tbody = this.handleInvestFlow(newVal, 'in');
        },
        'todayInvestOutflow'(newVal, oldVal){
            this.newExitTheme.tbody = this.handleInvestFlow(newVal, 'out');
        },
        'fiveInvestInflow'(newVal, oldVal){
            this.recentEnterTheme.tbody = this.handleInvestFlow(newVal, 'in');
        },
        'fiveInvestOutflow'(newVal, oldVal){
            this.recentExitTheme.tbody = this.handleInvestFlow(newVal, 'out');
        }
        
    },

    computed:{
        ...mapGetters([
            'todayInvestInflow',
            'todayInvestOutflow',
            'fiveInvestInflow',
            'fiveInvestOutflow'
            
        ])
    },
    mounted(){
         // 进入 回到顶部
        if(this.$route.path === '/information'){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        // 今日 近五日  资金流入流出
        this.getTodayInvestFlow({type: 'in'});
        this.getTodayInvestFlow({type: 'out'});
        this.getFiveInvestFlow({type: 'in'});
        this.getFiveInvestFlow({type: 'out'});

        this.getInfomationList({pageNo: 1});
    },
    methods: {
        ...mapActions(['getTodayInvestFlow', 'getFiveInvestFlow', 'getInfomationList']),


        // 资金流入流出  数据处理
        handleInvestFlow(data, type){
            let investArr = [];
            data.map((item) => {

                let obj = {};

                obj.id = item.id;
                obj.itemName = item.conceptStockName;
                if(type === 'in'){
                    
                    obj.items = [Util.formatMoney({num: item.flowInTotal, type:'亿'}) , (parseFloat(item.chg)).toFixed(2)];
                }else if(type === 'out'){
                    obj.items = [Util.formatMoney({num: item.flowOutTotal, type:'亿'}), (parseFloat(item.chg)).toFixed(2)];
                }

                investArr.push(obj);

            });

            return investArr;
        }
    }
}
</script>
