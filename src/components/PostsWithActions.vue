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
@use "@/assets/styles/variables" as *;

.posts-with-actions {
  position: relative;
  width: 800px;
  display: grid;
  padding: 30px;
  font-family: sans-serif;
  grid-template-columns: 313px 360px;
  column-gap: 67px;
  color: #4B4B4B;
  background: #F6F6F6 linear-gradient(to right bottom, #6357B1 0%, #6357B1 50%, transparent 50%) no-repeat top left/98% 160px;
}
</style>
