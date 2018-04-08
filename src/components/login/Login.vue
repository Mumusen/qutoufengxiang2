<template>
  <section class="Login">
      <div class="bgContaienr">
          <div class="container">
            <div class="title">
                <img src="../../static/image/slogan.png" alt="">
            </div>
            <div class="loginForm">
                <div class="loginTitle">账号登录</div>
                <form>
                    <div class="form-group">
                        <label for=""></label>
                        <input v-model="telNumber" type="text" placeholder="手机号码">
                    </div>
                    <div class="form-group">
                        <label for=""></label>
                        <input v-model="password" type="password" placeholder="请输入密码">
                    </div>
                    <div class="buttonGroup">
                        <button type="button" @click="handleLogin">登录</button>
                    </div>
                </form>
                <div class="operaRow">
                    <div class="op-l">
                        <!-- class="active" -->
                        <i @click="checked" :class="{active: isChecked}"></i> 
                        <span>下次自动登录</span>
                    </div>
                    <div class="op-r">
                        
                        <router-link to="/forget">忘记密码</router-link> |
                        <router-link to="/register">注册</router-link>
                        
                    </div>
                    
                </div>
                <div class="operaRow" >
                        
                    <router-link to="/conIndex" style="float: right;">返回首页</router-link>
                        
                </div>
            </div>
          </div>
      </div>
          <confirm-box v-show="infoIsAlert" :title="alertTitle"></confirm-box>
      <footer-single></footer-single>
  </section>
</template>

<script>
import FooterSingle from '../indexComponents/Footer';
import ConfirmBox from '../alertBox/ConfirmBox';
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return{
            isChecked: false,
            // 密码
            password: '',
            // 账号
            telNumber: '',
            // 弹出框
            infoIsAlert: false,
            // 提示框内容
            alertTitle: ''
        }
    },
    components: {
        FooterSingle,
        ConfirmBox
    },

    computed: { 
        ...mapGetters(['loginIfo'])
    },

    watch: {
        'loginIfo'(newVal, oldVal){
            // console.log(newVal);
            if(newVal.success){
                // 如果自动登录勾选
                if(this.isChecked){
                    localStorage.setItem('qutouPhone', newVal.uuid);
                    localStorage.setItem('loginTime', new Date());
                }else{
                    sessionStorage.setItem('qutouPhone', newVal.uuid);
                }
                this.refreshSTORAGE();
                this.$router.push({path: '/conIndex'});  
            }else{
                this.alertTitle = newVal.errMsg;
                this.infoIsAlert = true;

                let timer = setTimeout(()=>{
                    this.infoIsAlert = false;
                    this.alertTitle = '';
                    clearTimeout(timer);
                }, 2000);
            }
        }
    },

    methods: {
        ...mapActions(['accountNumberLogin', 'refreshSTORAGE']),
        checked(){
            this.isChecked = !this.isChecked;
        },

        // 点击登录
        handleLogin(){
            // 如果输入不为空
            if(this.password !== '' && this.telNumber !== ''){
                this.accountNumberLogin({
                    userName: this.telNumber,
                    pwd: this.password
                });

            }else{
                this.infoIsAlert = true;
                this.alertTitle = '输入不能为空';

                let timer = setTimeout(() => {
                    this.infoIsAlert = false;
                    this.alertTitle = '';
                    clearTimeout(timer);
                }, 2000);
            }
        }
    }
}
</script>
