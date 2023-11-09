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
	'createUser': async function(data:object) {
		return await post('users/create', data).then(response => response.json());
	},
	'loginUser': async function(username:string, password:string) {
		const response =  await post('auth/login', {'username':username, 'password':password});
		return response;
	},
};
