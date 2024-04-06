import {HttpResponse, http} from 'msw';
import posts from './mocks/posts.mock';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json(posts, {status: 200});
  })
];
