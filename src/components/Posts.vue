<template>
  <div class="posts">
    <h3 class="posts-header">Sortable Post List</h3>
    <TransitionGroup tag="div" class="post-list">
      <div class="post" data-test="post" v-for="(post, index) in posts" :key="post.id">
        Post {{ post.id }}
        <div class="controls">
          <button class="control up" v-if="index !== 0" data-test="post-control" @click="movePostUp(index)">
            <img src="../assets/icons/up.svg" alt="up">
          </button>
          <button class="control down" v-if="index !== posts.length - 1" data-test="post-control"
                  @click="movePostDown(index)">
            <img src="../assets/icons/up.svg" alt="up">
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
  import {usePostsStore} from '../store/posts';
  import {storeToRefs} from 'pinia';

  const store = usePostsStore()

  const { posts } = storeToRefs(store)
  const {requestPosts, movePostUp, movePostDown} = store

  requestPosts()
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.posts {
}

.posts-header {
  font-size: 20px;
  margin-bottom: 20px;
  color: #fff;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.post {
  display: flex;
  align-items: center;
  padding: 10px 6px 10px 10px;
  background-color: #fff;
  height: 65px;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

.controls {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.control {
  padding: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6357B1;

  img {
    height: 10px;
    width: 10px;
  }
}

.up {
}

.down {
  transform: rotate(180deg);
}

</style>
