<template>
<section class="personCenter">
    <div class="container personContainer">
        <div class="p_l">
            <div class="personHeader">
                <div class="imgBox"></div>
                <div class="userNum">
                    <span>{{qutouPhone}}</span>
                </div>
            </div>

            <div class="navList">
                <ul>
                    <li @click="nav(0)" :class="{active: navId === 0}"><i><b></b></i><span>关注的营业部</span></li>
                    <li @click="nav(1)" :class="{active: navId === 1}"><i><b></b></i><span>我的消息</span></li>
                    <li @click="nav(2)" :class="{active: navId === 2}"><i><b></b></i><span>密码修改</span></li>
                    <!-- <li @click="nav(3)" :class="{active: navId === 3}"><i><b></b></i><span>移动端下载</span></li> -->
                    
                </ul>
            </div>
        </div>
        <div class="p_r">
            <router-view></router-view>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data(){
        return {
            navId: 0,
            qutouPhone: ''
        }
    },
    watch: {
        '$route'(newVal, oldVal){
            // console.log(newVal);
            this.routerJudge(newVal.path);
        }
    },
    mounted(){
        // console.log(this.$route.path);
        // 进入 回到顶部
        if(this.$route.path.indexOf('/personCenter') > -1){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        this.routerJudge(this.$route.path);

        this.qutouPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone');
        this.qutouPhone = this.qutouPhone?this.qutouPhone.slice(0,12):null
    },
    methods: {
        nav(id){
            this.navId = id;
            if(id === 0){
                this.$router.push({
                    name: 'DepartmentFollow'
                });
                
            }else if(id === 1){
                this.$router.push({
                    name: 'MyMessage'
                });
            }else if(id === 2){
                this.$router.push({
                    name: 'ModifyPassword'
                });
            }
            // else if(id === 3){
            //     this.$router.push({
            //         name: 'DownLoadApp'
            //     });
            // }
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },

        // 路由判断
        routerJudge(path){
            if(path === '/personCenter/department'){
                this.navId = 0;
            }else if(path === '/personCenter/message'){
                this.navId = 1;
            }
        }
    }
}
</script>
