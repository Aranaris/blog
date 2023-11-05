import {api} from './configs/fetchConfigs';
import {User} from './UserAPI';

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

const get = async function(path: string) {
	const response = await fetch(api.baseURL + path, {'method': 'GET', 'mode': 'cors'});
	return await response.json();
};
