<template>
<div class="investListContainer container">
    
      <div class="investLeft">
        <!-- 今日关注主题 -->
        <div class="todayFollow">
          
          <follow-theme ></follow-theme>
          
        </div>

        <!-- 最新龙虎榜交易主题 -->
        <div class="newBillboardFollowTheme">
          <theme-label :title="newBillboardFollowTitle"></theme-label>
          <div class="tableContainer">

            <bill-board-table :billBoardTable="newBillBoardTable"></bill-board-table>
            
          </div>
            <div class="pageContainer">
                <page-select 
                    @changePage="newChangePage" 
                    :totalNum="newBoardTransTheme?newBoardTransTheme.totalCount:0" 
                    :pageSize="10"
                ></page-select>
            </div>
        </div>

        <!-- 近五日龙虎榜交易主题 -->
        <div class="recentBillboardFollowTheme">
            <theme-label :title="recentBillboardFollowTitle"></theme-label>
            <div class="tableContainer">

                <bill-board-table :billBoardTable="recentBillBoardTable"></bill-board-table>
            
            </div>
            <div class="pageContainer">
                <page-select 
                    @changePage="recentChangePage" 
                    :totalNum="fiveBoardTransTheme?fiveBoardTransTheme.totalCount:0" 
                    :pageSize="10"
                ></page-select>
            </div>
        </div>
      </div>
      <div class="investright">
          <div @click="enterSearch" class="themeSearch">
              <span>主题检索</span>
          </div>
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
</template>

<script>
import themeLabel from '../indexComponents/themeDetails/Label';
import FollowTheme from '../indexComponents/FollowTheme';
import BillBoardTable from './BillBoardTable';
import PageSelect from './PageSelect';

import InvestTable from './InvestTable';

import { mapActions, mapGetters } from 'vuex';
import Util from '../../util';
export default {
    data(){
        return {
            newBillboardFollowTitle: '最新龙虎榜交易主题',
            recentBillboardFollowTitle: '近五日龙虎榜交易主题',
            newEnterTitle: '今日资金流入主题',
            newExitTitle: '今日资金流出主题',
            recentEnterTitle: '近五日资金流入主题',
            recentExitTitle: '近五日资金流出主题',
            
            
            newBillBoardTable: { // 今日龙虎榜主题
                thead: ['主题名称', '合计买入(亿)', '合计卖出(亿)', '净买入(亿)', '涨跌幅', '上榜家数', '上榜个股'],
                tbody:[
                    // {
                    //     id: 0,
                    //     conceptName: '有色金属',
                    //     inAmount: '1.45',
                    //     outAmount: '1.42',
                    //     netAmount: '0.03',
                    //     changeRate: '1.3%',
                    //     heroCount: '3',
                    //     maxStockList: [
                    //         {
                    //             stockCode: 0,
                    //             stockName: '江西铜业'
                    //         },
                    //         {
                    //             stockCode: 1,
                    //             nastockNameme: '江西铜业'
                    //         },
                    //         {
                    //             stockCode: 2,
                    //             stockName: '江西铜业'
                    //         }
                            
                    //     ]
                    // }
                    
                    
                ]
            },
            recentBillBoardTable: { // 近五日龙虎榜主题
                thead: ['主题名称', '合计买入(亿)', '合计卖出(亿)', '净买入(亿)', '涨跌幅', '上榜家数', '上榜个股'],
                tbody:[
                    // {
                    //     id: 0,
                    //     conceptName: '有色金属',
                    //     inAmount: '1.45',
                    //     outAmount: '1.42',
                    //     netAmount: '0.03',
                    //     changeRate: '1.3%',
                    //     heroCount: '3',
                    //     maxStockList: [
                    //         {
                    //             stockCode: 0,
                    //             stockName: '江西铜业'
                    //         },
                    //         {
                    //             stockCode: 1,
                    //             nastockNameme: '江西铜业'
                    //         },
                    //         {
                    //             stockCode: 2,
                    //             stockName: '江西铜业'
                    //         }
                            
                    //     ]
                    // }
                    
                ]
            },
            newEnterTheme: {// 今日资金流入主题 
                textStyle:{
                    textRed: true,
                    textGreen: false
                },
                thead: ["主题名称", "资金流入(亿)", "涨幅"],
                tbody: [
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // }
                    
                    
                ]
            },
            newExitTheme: {// 今日资金流入主题 recentEnterTheme
                textStyle:{
                    textRed: true,
                    textGreen: false
                },
                thead: ["主题名称", "资金流出(亿)", "涨幅"],
                tbody: [
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // }
                    
                    
                ]
            },
            recentEnterTheme: {// 近五日资金流入主题 
                textStyle:{
                    textRed: true,
                    textGreen: false
                },
                thead: ["主题名称", "资金流入(亿)", "涨幅"],
                tbody: [
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // }
                    
                    
                ]
            },
            recentExitTheme: {// 近五日资金流入主题 
                textStyle:{
                    textRed: false,
                    textGreen: true
                },
                thead: ["主题名称", "资金流出(亿)", "涨幅"],
                tbody: [
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // }
                    
                    
                ]
            }
        }
    },
    components: {
        
        themeLabel,
        FollowTheme,
        BillBoardTable,
        PageSelect,
        InvestTable
    },
    watch: {
        'newBoardTransTheme'(newVal, oldVal){
            // console.log(newVal);
            // this.getBoardTransTheme({days: 1});
            this.newBillBoardTable.tbody = newVal.conceptStockHeroList;
        },
        'fiveBoardTransTheme'(newVal, oldVal){
            // this.getBoardTransTheme({days: 5});
            this.recentBillBoardTable.tbody = newVal.conceptStockHeroList;
        },

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
        },

        
    },
    computed: {
        ...mapGetters([
            'newBoardTransTheme', 
            'fiveBoardTransTheme', 
            'todayInvestInflow',
            'todayInvestOutflow',
            'fiveInvestInflow',
            'fiveInvestOutflow'
        ])
    },
    mounted(){
        this.getBoardTransTheme({days: 1});
        this.getBoardTransTheme({days: 5});

        // 今日 近五日  资金流入流出
        this.getTodayInvestFlow({type: 'in'});
        this.getTodayInvestFlow({type: 'out'});
        this.getFiveInvestFlow({type: 'in'});
        this.getFiveInvestFlow({type: 'out'});

        // 今日关注主题
        // this.getTodayFollowTheme();
    },

    methods: {
        ...mapActions(['getBoardTransTheme', 'getTodayInvestFlow', 'getFiveInvestFlow']),
        //  最新 分页
        newChangePage(data){
            this.getBoardTransTheme({days: 1, pageNo: data});
        },
        // 近五日 分页
        recentChangePage(data){
            // console.log(data);
            this.getBoardTransTheme({days: 5, pageNo: data});
        },

        // 跳转页面
        enterSearch(){
            this.$router.push({
                name: 'ThemeSearch'
            })
        },
        

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
