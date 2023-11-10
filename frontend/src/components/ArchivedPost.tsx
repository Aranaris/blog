import {BlogpostAPI, Post} from '../../apis/BlogpostAPI';
import {CommentAPI, Comment} from '../../apis/CommentAPI';
import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

function ArchivedPost() {
	const postID = useParams();
	const navigate = useNavigate();
	const [currentPost, setCurrentPost] = useState<Post>();
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		if (typeof postID.id !== 'undefined') {
			BlogpostAPI.getPostByID(postID.id).then(setCurrentPost);
			CommentAPI.getAllComments(postID.id).then(setComments);
		}
	}, [postID.id]);

	function onClickDeletePost() {
		if(postID.id) {
			BlogpostAPI.deletePost(postID.id).then(() => navigate('/'));
		}
	}

	return (
		<div className="Archived Post">
			<header>Post Details</header>
			<section>
				<header className="section">{currentPost?.title}</header>
				<p>{currentPost?.content}</p>
				<p>Posted on {currentPost?.postdate} by <Link to={`/users/${currentPost?.user?.id}`}>{currentPost?.user?.username}</Link></p>

				<header className='section'>Comments</header>
				{comments.map((comment, key) => (
					<p key={key}>"{comment.content}" By {comment.user.username} On {comment.commentdate}</p>
				))}
			</section>
			<button onClick={onClickDeletePost}>Delete Post</button>
		</div>
	);
}

export default ArchivedPost;
