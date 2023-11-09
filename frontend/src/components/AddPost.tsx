import '../styles/AddPost.css';
import {BlogpostAPI, Post} from '../../apis/BlogpostAPI';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function AddPost() {
	const navigate = useNavigate();
	const [postTitle, setPostTitle] = useState('');
	const [postContent, setPostContent] = useState('');
	const [errors, setErrors] = useState<Post['errors']>([]);

	function onTitleChange(event:React.FormEvent<HTMLInputElement>) {
		setPostTitle(event.currentTarget.value);
	}

	function onContentChange(event:React.FormEvent<HTMLTextAreaElement>) {
		setPostContent(event.currentTarget.value);
	}

	function onSubmitHandler (event:React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = {
			'title': postTitle,
			'content': postContent,
		};
		BlogpostAPI.createNewPost(formData).then((post)=> {
			if(typeof post.errors != 'undefined') {
				setErrors(post.errors);
			} else {
				navigate(`/posts/${post._id}`);
			}
		});
	}

	return (
		<div className="Add Post">
			<header>Add New Post</header>
			<form id="add-post-form" onSubmit={onSubmitHandler}>
				<label htmlFor='post-title'>
					Post Title:
				</label>
				<input className='title' id='post-title' type='text' onChange={onTitleChange}></input>
				<label htmlFor='post-content'>
					Content:
				</label>
				<textarea className='content-text' id='post-content' onChange={onContentChange}></textarea>
				{typeof errors !== 'undefined' && errors.map((error, key) => (
					<div key={key}>{error.msg}</div>
				))}
				<button type='submit' >Save and Submit</button>
			</form>
		</div>
	);
}

export default AddPost;
