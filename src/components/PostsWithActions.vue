<template>
  <div class="posts-with-actions">
    <div class="posts">
      <h3 class="posts-header">Sortable Post List</h3>
      <TransitionGroup tag="div" class="post-list">
        <div class="post" data-test="post" v-for="(post, index) in posts" :key="post.id">
          Post {{ post.id }}
          <div class="controls">
            <button class="control up" v-if="index !== 0" data-test="post-control" @click="movePostUp(index)">
              <img src="../assets/icons/up.svg" alt="up">
            </button>
            <button class="control down" v-if="index !== posts.length - 1" data-test="post-control" @click="movePostDown(index)">
              <img src="../assets/icons/up.svg" alt="up">
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div class="actions">
      <h3 class="actions-header">List of actions committed</h3>
      <div class="action-list">
        <Transition>
          <div v-if="hasActions" class="action-list-inner" key="1">
            <TransitionGroup>
              <div class="action" v-for="(action, index) in actions" :key="index">
                Moved post {{ action.postId }} from index {{ action.from }} to index {{ action.to }}
                <button class="time-travel" @click="timeTravel(index)">
                  Time travel
                </button>
              </div>
            </TransitionGroup>
          </div>
        </Transition>
        <Transition>
          <div v-if="!hasActions">
            No actions
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, computed} from 'vue';

const POSTS_LIMIT = 5;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const posts = ref<Post[]>([]);
const actions = reactive([]);

const hasActions = computed(() => {
  return Boolean(actions.length);
})

function movePostUp(index) {
  if (index === 0) {
    return;
  }
  addActionToHistory(posts.value[index].id, index, index - 1);
  swapElements(posts.value, index - 1, index);
}

function movePostDown(index) {
  if (index === POSTS_LIMIT - 1) {
    return;
  }
  addActionToHistory(posts.value[index].id, index, index + 1);
  swapElements(posts.value, index + 1, index);
}

function addActionToHistory(postId: number, from: number, to: number): void {
  actions.push({
    postId,
    from,
    to
  });
}

function timeTravel(index) {
  const actionsForTravel = actions.splice(index);
  for (let i = actionsForTravel.length - 1; i >= 0; i--) {
    const {from, to} = actionsForTravel[i];
    swapElements(posts.value, from, to);
  }
}

function swapElements(array: unknown[], index1: number, index2: number) {
  [array[index1], array[index2]] = [array[index2], array[index1]];
}

try {
  posts.value = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5').then(response => response.json());
} catch (e) {
  console.error(e);
}
</script>

<style scoped lang="scss">
$border-radius: 4px;
$box-shadow: 3px 3px 6px 1px rgba(#000, 0.1);
$border: 1px solid #EAEAEA;

.posts-with-actions {
  position: relative;
  width: 800px;
  display: grid;
  padding: 30px;
  font-family: sans-serif;
  grid-template-columns: 313px 360px;
  column-gap: 67px;
  color: #4B4B4B;
  background: #F6F6F6 linear-gradient(to right bottom, #6357B1 0%, #6357B1 50%, transparent 50%) no-repeat top left/98% 32%;
}

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

.actions {
  height: fit-content;
  border-radius: $border-radius;
  border: $border;
  box-shadow: $box-shadow;
  background-color: #fff;
}

.actions-header {
  padding: 20px 15px;
  font-size: 16px;
}

.action-list {
  padding: 15px;
  background-color: #F5F5F5;
}

.action-list-inner {
  position: relative;
  border: $border;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  background: #fff;
}

.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 8px;
  height: 50px;

  &:not(:first-child) {
    border-top: $border;
  }
}

.time-travel {
  padding: 10px 18px;
  margin-left: 15px;
  border: none;
  background-color: #25FF90;
  cursor: pointer;
  border-radius: $border-radius;
  color: #4B4B4B;
}

.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.v-leave-active {
  position: absolute;
}
</style>
