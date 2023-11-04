import {useEffect, useState} from 'react';
import {UserAPI, User} from '../apis/UserAPI.tsx';
import {BlogpostAPI, Post} from '../apis/BlogpostAPI.tsx';
import './App.css';

function App() {
	const [userList, setUserList] = useState<Array<User>>([]);
	const [postList, setPostList] = useState<Array<Post>>([]);
	const [currentUser, setCurrentUser] = useState<User>();
	const [currentPost, setCurrentPost] = useState<Post>();

	useEffect(() => {
		UserAPI.getAllUsers().then((users) => {
			setUserList(users);
		});

		BlogpostAPI.getAllPosts().then((posts) => {
			setPostList(posts);
		});

	}, []);

	const getUser = async function (id:string) {
		UserAPI.getUserByID(id).then((user) => {
			setCurrentUser(user);
		});
	};

	const getPost = async function (id:string) {
		BlogpostAPI.getPostByID(id).then((post) => {
			setCurrentPost(post);
		});
	};

	return (
		<>
			<header>App.tsx</header>
			<div className="card">
				<h3>Users</h3>
				{userList.map((user, key) => (
					<p key={key}>ID: {user._id} || Username: {user.username} || Last Login: {user.lastaction}</p>
				))}
				<button onClick={() => getUser('6538582c3f068a67f6a901bf')}>
          current user is {currentUser?.username}
				</button>
				<h3>Posts</h3>
				{postList.map((post, key) => (
					<p key={key}>ID: {post._id} || Username: {post.user.username} || Title: {post.title} || Content: {post.content} || Post Date: {post.postdate}</p>
				))}
				<button onClick={() => getPost('65385888884b774dd387ac8f')}>
          current post is {currentPost?.title}
				</button>
			</div>
		</>
	);
}

export default App;
