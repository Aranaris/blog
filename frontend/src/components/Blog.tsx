import {BlogpostAPI, Post} from '../../apis/BlogpostAPI';
import {useEffect, useState} from 'react';

function Blog() {
	const [currentPost, setCurrentPost] = useState<Post>();

	useEffect(() => {
		BlogpostAPI.getLatestPost().then((post) => {
			setCurrentPost(post);
		});
	}, []);

	return (
		<div className="Blog">
			<header>Blog</header>
			<section>
				<header className="section">{currentPost?.title}</header>
				<p>{currentPost?.content}</p>
				<footer>Posted on {currentPost?.postdate} by {currentPost?.user.username}</footer>
			</section>
		</div>
	);
}

export default Blog;
