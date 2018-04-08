<template>
<section class="forgetPassword">
    <div class="container">
        <div class="backPassword">
            <div class="title">
                <span>找回密码</span>
            </div>
            <div class="formContainer">
                <div class="placeholderBox"></div>
                <form>
                    <div class="form-group">
                        <label></label>
                        <input type="text" placeholder="手机号">
                    </div>
                    <div class="swipeBlock">
                        <label></label>
                        <div class="swipeContaienr" style="width:80%;">
                            <swipe-block @swipeSuccess="swipeSuccess"></swipe-block>
                        </div>
                    </div>
                    <div class="testArea" v-show="isTestSuccess">
                        <div class="testCodeContainer">
                            <label></label>
                            <input v-model="testCodeInfo.info" type="text" placeholder="验证码">
                            <button @click="testCode" :disabled="testCodeInfo.disabled" :style="testCodeInfo.style" type="button">发送验证码</button>
                            <span v-show="testCodeInfo.isStart">{{testCodeInfo.time}}S</span>
                        </div>
                    </div>

                    <div class="nextStep">
                        <button type="button">下一步</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</section>
</template>

<script>
import SwipeBlock from '../register/SwipeBlock';
export default {
    data(){
        return {
            alertTitle: '注册成功',
            isShow: false, // 提示框
            isTestSuccess: false, // 滑块是否通过
            isAgree: true, //  是否同意协议
            // 手机号
            telInfo: {
                telNumber: '',
                telIsPass: false,
                style: {
                    textRed: false
                },
                info: ''  // 手机不符合格式，不支持港、澳、台地区手机号
            },
            //  验证码 
            testCodeInfo: {
                info: '',
                disabled: false,
                style: {
                    cursor: 'pointer',
                    background:  '#d3bc8a' // '#818080'
                },
                isStart: false,
                time: 59
            },
            

            
        }
    },

    components: {
        SwipeBlock
    },

    methods: {
        swipeSuccess(bool){
            this.isTestSuccess = bool;
        },


        //  验证码 发送
        testCode(){
            this.testCodeInfo.isStart = true; // 开始显示计数器
            this.testCodeInfo.disabled = true; // 按钮禁用
            this.testCodeInfo.style = {      //  按钮禁用样式
                cursor: 'default',
                background:  '#f4f4f4', // '#d3bc8a'
                color: '#666'
            };
            let timer = setInterval(()=>{
                this.testCodeInfo.time -- ;
                
                if(this.testCodeInfo.time <= 2){
                    clearInterval(timer);

                    this.testCodeInfo.isStart = false; // 开始显示计数器
                    this.testCodeInfo.disabled = false; // 按钮禁用
                    this.testCodeInfo.style = {      //  按钮禁用样式
                        cursor: 'pointer',
                        background:  '#d3bc8a', // '#f4f4f4'
                        color: '#fff'
                    };

                    this.testCodeInfo.time = 59;
                }
            }, 1000);

            
        },
    }
}
</script>
