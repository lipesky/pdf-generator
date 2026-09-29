<script lang="ts" setup>
import {ref} from 'vue';

const items = ref((new Array(50)).fill(null).map((v, i) => ({index: i, title: `card-${i}`})))
</script>
<template>
    <div class="rel">
        <h2>Titulo do relatório</h2>
        <div style="margin: 0 40px">
        <div v-for="(x, i) in items" :key="i" style="margin-bottom: 15px; border: 1px solid black; padding: 20px; border-radius: 8px; break-inside: avoid;">
            <p style="font-size: 1.3em; font-weight: bold; margin-bottom: 5px">{{ x.title }}</p>
            <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nibh lacus, rhoncus ac mollis vitae, pharetra at est. Integer id efficitur ipsum. Maecenas vel congue turpis. Quisque eget facilisis nisi. Etiam enim justo, convallis vel metus a, rhoncus ultricies lacus. Sed eget tellus a justo auctor mattis sed sit amet orci. Cras quis pulvinar ex. Proin sodales odio convallis lorem interdum, vitae tincidunt magna bibendum. Mauris rutrum felis blandit purus tempus, vel feugiat ipsum ornare. Fusce non felis in nulla ultricies maximus. Nulla posuere sit amet tellus at volutpat. Etiam tincidunt venenatis suscipit
            </div>
        </div>
        </div>
    </div>
</template>
<style scoped>
.rel{
  print-color-adjust: exact;
}
</style>