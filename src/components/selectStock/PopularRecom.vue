<template>
<div class="popularRecom">
    <h2>热门推荐</h2>
    <h3>大数据挖掘牛股</h3>
    <div class="update" @click="changeRandom">
        <i></i><span>换一换</span>
    </div>
    <div class="popularList">
        <ul v-if="popularRecomend">
            
            <li v-for="hot in popularRecomend">
                <span><i :class="hot.infoType === 1?'hActive':''"></i></span>
                <span class="textRed">
                    <router-link v-if="hot.infoType === 0" :to="'/themeDetails?id='+hot.infoId">
                        {{hot.infoName}}
                    </router-link>
                    <router-link 
                        v-if="hot.infoType === 1" 
                        :to="'/stockDetails?name='+hot.infoName+'&code='+hot.infoToken+'&marketCode='+hot.dataType"
                    >
                    {{hot.infoName}}
                    </router-link>
                </span>
            </li>
            <!-- <li>
                <span><i class="hActive"></i></span>
                <span class="textRed">中国中期</span>
            </li> -->
            
            
        </ul>
    </div>

    <div class="oneKeyAdd">
        <button @click="handle_OneKeyAdd">一键添加</button>
    </div>
    <confirm-box v-show="alertIsShow" :title="title"></confirm-box>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ConfirmBox from '../alertBox/ConfirmBox'
export default {
    props: ['conceptCount'],
    data(){
        return {
            alertIsShow: false,
            title: '',
            // 总条数
            
        }
    },
    components: {
        ConfirmBox
    },
    computed: {
        ...mapGetters(['optionalHotRecommend', 'onekeyAdd']),
        popularRecomend(){
            // console.log(this.optionalHotRecommend.info.hotStockList);
            // return null;
            if(this.optionalHotRecommend){
                
                return this.optionalHotRecommend.info.hotStockList.concat(this.optionalHotRecommend.info.hotConceptList)
            }else{
                return null;
            }
        }
    },
    watch: {
        'onekeyAdd'(newVal, oldVal){
            // console.log(newVal);
            if(newVal.success){
                this.alertIsShow = true;
                this.title = '添加成功';
                let timer = setTimeout(() => {
                    this.title = '';
                    location.reload();
                    clearTimeout(timer);
                }, 1500);
            }else{
                this.alertIsShow = true;
                this.title = '添加失败';
                let timer = setTimeout(() => {
                    this.title = '';
                    // location.reload();
                    clearTimeout(timer);
                }, 1500);
            }
            
        }
        
    },

    methods: {
        ...mapActions(['handleOnekeyAdd', 'getOptionalHotRecommend']),
        handle_OneKeyAdd(){
            let storage = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
            if(storage){
                this.handleOnekeyAdd({
                    infos: this.dataSet()
                })
                
            }else{
                this.$router.push({
                    path: '/login'
                })
            }
        },

        // 数据重组
        dataSet(){
            // 根据后台要求 把数据改成相应的格式
            let str = '';
            // console.log(this.popularRecomend);
            this.popularRecomend.map((item)=>{
                let info = item.infoId + ':' + item.infoType + ':' + item.infoToken;
                str += info + ',';
            });

            // console.log(str.substr(0, str.length-1));
            return str.substr(0, str.length-1);
        },

        // 换一换
        changeRandom(){

            let randomNum = Math.floor(Math.random() * this.conceptCount + 1);
            // console.log(randomNum);
            this.getOptionalHotRecommend()
        }
    }
}
</script>
