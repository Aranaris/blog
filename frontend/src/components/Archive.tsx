import {BlogpostAPI, Post} from '../../apis/BlogpostAPI';
import {useEffect, useState} from 'react';
import * as reactRouterDom from 'react-router-dom';

function Archive() {
	const [postList, setPostList] = useState<Post[]>([]);

	useEffect(() => {
		BlogpostAPI.getAllPosts().then(setPostList);
	}, []);

	return (
		<div className="Archive">
			<header>All Posts</header>
			<section>
				{postList.map((post, key) => (
					<reactRouterDom.Link to={`/posts/${post._id}`} key={key}>{post.title} by {post.user.username} - {post.postdate}<br></br></reactRouterDom.Link>
				))}
			</section>
		</div>
	);
}

export default Archive;
