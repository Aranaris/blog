import {User} from './UserAPI';
import {get} from './common';

export interface Post {
    _id: string,
    user: User,
    title: string,
    content: string,
    postdate: string,
    status: string,
  }

export const BlogpostAPI = {
	'getAllPosts': async function():Promise<Post[]> {
		return await get('posts');
	},
	'getPostByID': async function(id:string):Promise<Post> {
		return await get(`posts/${id}`);
	},
	'getLatestPost': async function():Promise<Post> {
		return await get('posts/latest');
	},
};
