<template>
<div class="themeTop">
    <div class="title">{{themeTopList.title}}</span>
    </div>
    <div class="themeTopList">
        <ul>
            <li 
                v-for="themeTop in themeTopList.list" :style="themeTop.style"
                @click="jumpThemeDetails({id: themeTop.id})"
            >
                <span>{{themeTop.data}}</span>
                <span>{{themeTop.name}}</span>
            </li>
            <!-- <li>
                <span>+22.3%</span>
                <span>保险行业</span>
            </li>
            <li>
                <span>+22.3%</span>
                <span>保险行业</span>
            </li>
            <li>
                <span>+22.3%</span>
                <span>保险行业</span>
            </li>
            <li>
                <span>+22.3%</span>
                <span>保险行业</span>
            </li>
            <li>
                <span>+22.3%</span>
                <span>保险行业</span>
            </li>
            <li>
                <span>+22.3%</span>
                <span>保险行业</span>
            </li> -->
            
            
        </ul>
    </div>
</div>
</template>

<script>
export default {
    props: ["themeTopList"],
    data(){
        return {
            
        }
    },

    methods: {
        jumpThemeDetails(obj){
            let { id } = obj;
            
            this.$router.push({
                path: '/themeDetails',
                query: {
                    id: id
                }
            })
        }
    }
}
</script>

