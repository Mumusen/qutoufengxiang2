<template>
<div class="AlertWindow">
    <div class="confirm">
        <div class="title">
            <span>{{title}}</span>
        </div>

        <!-- <div class="operation">
            
            <a href="javascript:history.go(-1);">立即返回</a>
        </div> -->
    </div>
</div>
</template>

<script>
export default {
    props: ["title"]
}
</script>
