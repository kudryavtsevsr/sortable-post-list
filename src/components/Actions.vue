<template>
  <div class="actions">
    <h3 class="actions-header">List of actions committed</h3>
    <div class="action-list">
      <Transition>
        <div v-if="!hasActions">
          No actions
        </div>
      </Transition>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import {useActionsStore} from '../store/actions';
import {storeToRefs} from 'pinia';

const store = useActionsStore()
const { actions, hasActions } = storeToRefs(store)
const { timeTravel } = store
</script>

<style scoped lang="scss">
.actions {
  height: fit-content;
  border-radius: $border-radius;
  border: $border;
  box-shadow: $box-shadow;
  background-color: $color-background-secondary;
}

.actions-header {
  padding: 20px 15px;
  font-size: 16px;
}

.action-list {
  padding: 15px;
  background-color: $color-background-main;
}

.action-list-inner {
  position: relative;
  border: $border;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  background: $color-background-secondary;
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
  background-color: $color-accent-secondary;
  cursor: pointer;
  border-radius: $border-radius;
  color: $color-text-main;
}
</style>
