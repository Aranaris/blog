import '../styles/AddPost.css';
import { api } from '../../apis/configs/fetchConfigs';

function AddPost() {
	return (
		<div className="Add Post">
			<header>Add New Post</header>
			<form id="add-post-form" method='POST' action={`${api.baseURL}posts/create`}>
				<label htmlFor='title'>
					Post Title:
				</label>
				<input className='title' name='title' type='text'></input>
				<label htmlFor='content'>
					Content:
				</label>
				<textarea className='content-text' name='content'></textarea>
				<button type='submit'>Save and Submit</button>
			</form>
		</div>
	);
}

export default AddPost;
