import {get} from './common';

export interface User {
  _id: string,
  username: string,
  lastaction: string,
}

export const UserAPI = {
	'getAllUsers': async function():Promise<User[]> {
		return await get('users');
	},
	'getUserByID': async function(id:string):Promise<User> {
		return await get(`users/${id}`);
	},
};
