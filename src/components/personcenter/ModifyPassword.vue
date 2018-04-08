<template>
<section class="modifyPassword">
    <div class="container">
        <div class="passwordContainer">
            <div class="form">
                
                <form>
                    <div class="title">
                        <span>修改密码</span>
                    </div`>
                    <div class="form-group">
                        <label for="originalPwd"></label>
                        <input v-model="originalPwd" type="password" placeholder="原始密码">
                        <span></span>
                    </div>
                    <div class="form-group">
                        <label for="newPwd"></label>
                        <input @keyup="passwordTest($event)" v-model="newPwd" type="password" placeholder="新密码">
                        <span :style="alertStyle.style">{{alertStyle.content}}</span>
                    </div>
                    <div class="botton-group">
                        <button @click="confirm" type="button" class="confirm">确认</button>
                        <button @click="back" type="button" class="back">返回</button>
                    </div>
                </form>
            </div> 
            
        </div>
        <confirm-box v-show="isShow" :title="alertTitle"></confirm-box>
    </div>
    
</section>
</template>

<script>
import ConfirmBox from '../alertBox/ConfirmBox';
import { mapGetters, mapActions } from 'vuex';
export default {
    data(){
        return {
            alertTitle: '',
            isShow: false, // 弹框隐藏
            originalPwd: '',// 原始密码
            newPwd: '', // 新密码
            alertStyle: { // 提示样式  内容
                style: {
                    color: '#ccc'
                },
                content: '请输入6-12位字母或数字'
            }
        }
    },

    components: {
        ConfirmBox
    },

    computed: {
        ...mapGetters(['modifyPassword'])
    },

    watch: {
        'modifyPassword'(newVal, oldVal){
            // console.log(newVal);
            this.alertTitle = newVal.msg;
            this.isShow = true;
            
            setTimeout(()=>{
                this.alertTitle = '';
                this.isShow = false;

                if(newVal.data){
                    this.$router.push({
                        path: '/login'
                    })
                }
            }, 1500)
        }
    },

    methods: {
        ...mapActions(['modifyPersonPassword']),
        // 密码格式判断
        passwordTest(){
            let test = /^[\d\w.!@#$%&*/]{6,12}$/ig;

            let bool = test.test(this.newPwd);
            if(this.newPwd !== ''){
                if(bool){
                    this.alertStyle.style.color = '#32cf36';
                    this.alertStyle.content = '密码符合规范';
                }else{
                    this.alertStyle.style.color = '#f00';
                    this.alertStyle.content = '密码不符合规范';
                }
            }else{
                this.alertStyle.style.color = '#ccc';
                this.alertStyle.content = '请输入6-12位字母或数字';
            }
            
        },

        // 确认
        confirm(){
            this.modifyPersonPassword({
                oldPwd: this.originalPwd,
                password: this.newPwd
            });
        },

        // 返回
        back(){
            history.go(-1);
        }
    }
}
</script>

