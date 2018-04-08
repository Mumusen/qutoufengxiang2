<template>
<table class="CapitalFlow">
    <thead>
        <tr>
            <th v-for="head in capitalTableInfo.thead">{{head}}</th>
            <!-- <th>资金流入(亿)</th>
            <th>涨幅</th> -->
        </tr>
    </thead>
    <tbody>
        <tr v-for="body in capitalTableInfo.tbody">
            <td>
                <router-link :to="'/themeDetails?id='+body.id">

                    {{body.itemName}}
                </router-link>
            </td>
            <td :class="capitalTableInfo.textStyle">{{body.items[0]}}</td>
            <td :class="body.items[1]>=0?'textRed':'textGreen'">{{body.items[1] + '%'}}</td>
        </tr>
        <!-- <tr>
            <td>保险</td>
            <td :class="textStyle">1.09</td>
            <td :class="textStyle">3.47%</td>
        </tr>
        <tr>
            <td>保险</td>
            <td :class="textStyle">1.09</td>
            <td :class="textStyle">3.47%</td>
        </tr>
        <tr>
            <td>保险</td>
            <td :class="textStyle">1.09</td>
            <td :class="textStyle">3.47%</td>
        </tr> -->
    </tbody>
</table>
</template>

<script>
export default {
    props: ["capitalTableInfo"],
    data(){
        return {
            
        }
    }
}
</script>

