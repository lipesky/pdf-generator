<script lang="ts" setup>
import {ref} from 'vue';

</script>
<template>
    <footer>
        <div class="flex justify-content-between align-items-center">
            <span class="date">date</span>
            <span class="pageNumber">number</span>
        </div>
    </footer>
</template>
<style scoped>
footer{
    width: 100vw;
    font-size: 0.85em;
}
footer > div{
    margin: 0 1cm;
}
</style>