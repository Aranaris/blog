import {get} from './common';
import {User} from './UserAPI';
import {Post} from './BlogpostAPI';

export interface Comment {
	_id: string,
	user: User,
	post: Post,
	content: string,
	commentdate: string,
}

export const CommentAPI = {
	'getAllComments': async function(id:string):Promise<Comment[]> {
		return await get(`posts/${id}/comments`);
	},
};
