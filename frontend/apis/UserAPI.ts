import {Post} from './BlogpostAPI';
import {get, post, Error} from './common';

export interface User {
  _id: string,
  id: string,
  username: string,
  firstname: string,
  lastaction: string,
  role: string,
  errors?: Array<Error>,
}

export const UserAPI = {
	'getAllUsers': async function():Promise<User[]> {
		return await get('users');
	},
	'getUserByID': async function(id:string):Promise<User> {
		return await get(`users/${id}`);
	},
	'createUser': async function(data:object):Promise<User> {
		return await post('users/create', data);
	},
	'loginUser': async function(username:string, password:string):Promise<User> {
		return await post('auth/login', {'username':username, 'password':password});
	},
	'logoutUser': async function() {
		return await post('auth/logout');
	},
	'deleteUser': async function(id:string):Promise<User> {
		return await post(`users/${id}/delete`);
	},
	'getUserPosts': async function(id:string):Promise<Array<Post>> {
		return await get(`users/${id}/posts`);
	},
};
