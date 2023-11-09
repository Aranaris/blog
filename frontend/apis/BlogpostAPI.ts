import {User} from './UserAPI';
import {get, post, Error} from './common';

export interface Post {
    _id: string,
    user: User,
    title: string,
    content: string,
    postdate: string,
    status: string,
	errors?: Array<Error>,
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
	'createNewPost': async function (data:object):Promise<Post> {
		return await post('posts/create', data);
	},
};
