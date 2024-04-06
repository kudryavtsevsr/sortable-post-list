import {flushPromises, mount} from '@vue/test-utils';
import PostsWithActions from './PostsWithActions.vue';
import {test, expect} from 'vitest';
import {createPinia} from 'pinia';

let wrapper;

beforeEach(async () => {
  wrapper = mount(PostsWithActions, {
    global: {
      plugins: [createPinia()]
    }
  })

  await flushPromises();
})

test('Posts are display', async () => {
  const posts = wrapper.findAll('[data-test="post"]');

  expect(posts.length).toEqual(5);

  posts.forEach((post, index) => {
    expect(post.text()).toContain('Post ' + (index + 1));
  });
});

describe('Posts are reorder', () => {
  test('Post 1 has only one button, and when clicked, the order of the posts changes', async () => {
    let posts = wrapper.findAll('[data-test="post"]');
    const post1 = posts.find(element => element.text().includes('Post 1'));
    const post1Controls = post1.findAll('[data-test="post-control"]');
    expect(post1Controls.length).toEqual(1);
    await post1Controls[0].trigger('click');
    const expectedOrder = ['Post 2', 'Post 1', 'Post 3', 'Post 4', 'Post 5'];
    posts = wrapper.findAll('[data-test="post"]');
    posts.forEach((post, index) => {
      expect(post.text()).toContain(expectedOrder[index]);
    });
  });

  test('Post 5 has only one button, and when clicked, the order of the posts changes', async () => {
    let posts = wrapper.findAll('[data-test="post"]');
    const post5 = posts.find(element => element.text().includes('Post 5'));
    const post5Controls = post5.findAll('[data-test="post-control"]');
    expect(post5Controls.length).toEqual(1);
    await post5Controls[0].trigger('click');
    const expectedOrder = ['Post 1', 'Post 2', 'Post 3', 'Post 5', 'Post 4'];
    posts = wrapper.findAll('[data-test="post"]');
    posts.forEach((post, index) => {
      expect(post.text()).toContain(expectedOrder[index]);
    });
  });
});

// Action is added when the order is changed
// Time travel works
