import {defineStore} from 'pinia';
import {reactive} from 'vue'
import swapElements from '../utils/swap-array-elements';
import {useActionsStore} from './actions';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const POSTS_LIMIT = 5;

export const usePostsStore = defineStore('posts', () => {
  const posts = reactive([]);

  async function requestPosts() {
    try {
      const postsRequestResult = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5').then(response => response.json());
      posts.splice(0, posts.length, ...postsRequestResult)
    } catch (e) {
      console.error(e);
    }
  }

  function movePostUp(index) {
    if (index === 0) {
      return;
    }
    addActionToHistory(posts[index].id, index, index - 1);
    swapElements(posts, index - 1, index);
  }

  function movePostDown(index) {
    if (index === POSTS_LIMIT - 1) {
      return;
    }
    addActionToHistory(posts[index].id, index, index + 1);
    swapElements(posts, index + 1, index);
  }

  function addActionToHistory(postId: number, from: number, to: number): void {
    const actionsStore = useActionsStore()
    actionsStore.actions.push({
      postId,
      from,
      to
    });
  }

  return {
    posts,
    requestPosts,
    movePostUp,
    movePostDown
  }
})
