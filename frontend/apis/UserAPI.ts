import {get, post, Error} from './common';

export interface User {
  _id: string,
  username: string,
  firstname: string,
  lastaction: string,
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
	'loginUser': async function(username:string, password:string):Promise<string> {
		return await post('auth/login', {'username':username, 'password':password});
	},
};
