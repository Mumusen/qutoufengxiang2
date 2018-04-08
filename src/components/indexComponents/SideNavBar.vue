<template>
<div class="SideNavBar">
    <ul>
        <li @click="backTop">
            
            <i></i>
            
        </li>
        <li>
            <i></i>
            <span>订阅号</span>
            <b class="imgContainer">
                <img src="../../../static/image/dyh.jpg" alt="">
            </b>
        </li>
        <li>
            <i></i>
            <span>公众号</span>
            <b class="imgContainer">
                <img src="../../../static/image/gzh.jpg" alt="">
            </b>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        backTop(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
}
</script>
