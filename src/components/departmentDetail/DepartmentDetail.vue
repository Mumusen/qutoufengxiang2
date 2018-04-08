<template>
<section class="departmentDetail">
    <div class="themeTitle">
        <div class="container">
            <div class="theme" v-if="departmentBasicInfo">
                <h1><i></i><span>龙虎榜 > {{departmentBasicInfo.departmentData.chi_name}}</span></h1>
                
                <div class="follow">
                    <span 
                        v-if="!departmentBasicInfo.fellow" 
                        @click="addDepartmentlFollowAction({
                            infoToken: departmentBasicInfo.departmentData.bo_code
                            
                        })">
                        <strong>+</strong>
                        <b>关注</b>
                    </span>
                    <span 
                        v-if="departmentBasicInfo.fellow"
                        @click="cancelDepartmentFollowAction({
                            infoToken: departmentBasicInfo.departmentData.bo_code
                        })"
                    ><b>取消关注</b></span>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <!-- <div class="departTitle">
            <span>龙虎榜</span>
            <b> > </b> 
            <span>国泰君安证券股份有限公司南京太平南路证券营业部</span>
        </div> -->
        
        <div class="changeColumn">
            <div class="handle">
                <ul>
                    <li @click="handleCol('history')" :class="currentClassName==='history'?'active':''">历史交易数据统计</li>
                    <li @click="handleCol('business')" :class="currentClassName==='business'?'active':''">期间买卖详情统计</li>
                </ul>
            </div>
            <!-- <div class="display">
                <span>数据截至日期：2017-10-17</span>
            </div> -->
        </div>
        <confirm-box v-if="boxIsShow" :title="title"></confirm-box>
        <router-view></router-view>
    </div>
</section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ConfirmBox from '../alertBox/ConfirmBox';
export default {
    name: 'DepartmentDetail',
    data(){
        return {
            currentClassName: 'history',
             // 弹出框 是否显示
            boxIsShow: false,
            // 弹出框内容
            title: ''
        }
    },

    components: {
        ConfirmBox
    },

    computed: {
        ...mapGetters(['departmentDetail', 'optionalAddFollow', 'optionalCancelFollow']),
        departmentBasicInfo(){
            return this.departmentDetail;
        }
    },

    watch: {
        '$route'(newVal, oldVal){
            if(newVal === oldVal){
                
                if(oldVal.path.indexOf('history') !== -1){
                
                    this.currentClassName = 'history';
                }else if(oldVal.path.indexOf('business') !== -1){
                    this.currentClassName = 'business';
                }
            }
            
        },

        'optionalCancelFollow'(newVal, oldVal){
            // console.log(newVal);
            if(newVal.success){
                this.departmentBasicInfo.fellow = false;
            }else{
                this.title = '取消关注失败';
                this.boxIsShow = true;
                let timer = setTimeout(() => {
                    this.boxIsShow = false;
                    this.title = '';
                    clearTimeout(timer);
                }, 1500)
            }
        },

        'optionalAddFollow'(newVal, oldVal){
            // console.log(newVal);
            if(newVal.login){
                if(newVal.success && newVal.attention){
                    this.departmentBasicInfo.fellow = true;
                }else{
                    this.title = '关注失败';
                    this.boxIsShow = true;
                    let timer = setTimeout(() => {
                        this.boxIsShow = false;
                        this.title = '';
                        clearTimeout(timer);
                    }, 1500)
                }
            }else{
                this.$router.push({
                    path: '/login'
                })
            }
        }
    },

    
    mounted(){
        this.getDepartDetail({
            bo_code: this.$route.query.id
        });
        // console.log(this.$route.path);
        // 进入 回到顶部
        if(this.$route.path.indexOf('/departmentDetail') !== -1){
            // console.log(this.$route.path)
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            if(this.$route.path.indexOf('/history') !== -1){
                this.currentClassName = 'history';
            }else{
                // console.log('lll')
                this.currentClassName = 'business';
            }
        }

       
    },

    destroyed(){
        // 离开页面是 清除数据缓存
        this.clearDetails('department');
    },

    methods: {
        ...mapActions(['getDepartDetail', 'addDepartmentlFollowAction', 'cancelDepartmentFollowAction', 'clearDetails']),
        handleCol(path){
            this.currentClassName = path;
            this.$router.push({
                path: path,
                query: {
                    id: this.$route.query.id
                }
            });
        }
    }
}
</script>

