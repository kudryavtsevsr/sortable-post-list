<script setup lang="ts">
import { Suspense } from 'vue';
import PostsWithActions from './components/PostsWithActions.vue';
</script>

<template>
  <Suspense>
    <PostsWithActions />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<style scoped>
</style>
