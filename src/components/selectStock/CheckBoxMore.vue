<template>
<div @click="checked" class="CheckBoxMore">
    <i :class="{'active':active}"></i>
</div>
</template>

<script>
export default {
    props: ["labelId"],
    data(){
        return {
            active: false
        }
    },

    methods: {
        checked(){
            this.active = !this.active;

            this.$emit('checkedMore', this.labelId, this.active);
        }
    }
}
</script>
