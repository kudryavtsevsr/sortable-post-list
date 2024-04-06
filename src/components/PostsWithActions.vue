<template>
  <div class="posts-with-actions">
    <Posts />
    <Actions />
  </div>
</template>

<script setup lang="ts">
import Posts from './Posts.vue';
import Actions from './Actions.vue';
</script>

<style scoped lang="scss">
.posts-with-actions {
  position: relative;
  width: 800px;
  display: grid;
  padding: 30px;
  font-family: sans-serif;
  grid-template-columns: 313px 360px;
  column-gap: 67px;
  color: $color-text-main;
  background: $color-background-alt linear-gradient(to right bottom, $color-accent-main 0%, $color-accent-main 50%, transparent 50%) no-repeat top left/98% 160px;
}
</style>
