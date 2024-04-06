import {defineStore} from 'pinia';
import {reactive, computed} from 'vue';
import swapElements from '../utils/swap-array-elements';
import {usePostsStore} from './posts';

export const useActionsStore = defineStore('actions', () => {
  const actions = reactive([]);

  const hasActions = computed(() => {
    return Boolean(actions.length);
  });

  function timeTravel(index: number) {
    const postsStore = usePostsStore()
    const actionsForTravel = actions.splice(index);
    for (let i = actionsForTravel.length - 1; i >= 0; i--) {
      const {from, to} = actionsForTravel[i];
      swapElements(postsStore.posts, from, to);
    }
  }

  return {
    actions,
    hasActions,
    timeTravel
  }
})
