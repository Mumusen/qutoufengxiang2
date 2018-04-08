<template>
<section class="fuzzySearch">
    <div class="container">
        <div class="fuzzySearchContainer">

            <fuzzy-search></fuzzy-search>
        </div>
    </div>
</section> 
</template>

<script>
import FuzzySearch from '../selectStock/SearchArea';

export default {
    data(){
        return {

        }
    },

    components: {
        FuzzySearch
    }
}
</script>

