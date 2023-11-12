import {UserAPI,User} from '../../apis/UserAPI';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Post} from '../../apis/BlogpostAPI';

function UserProfile() {
	const userID = useParams();
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState<User>();
	const [postList, setPostList] = useState<Array<Post>>([]);

	useEffect(() => {
		if (typeof userID.id !== 'undefined') {
			UserAPI.getUserByID(userID.id).then(setCurrentUser);
			UserAPI.getUserPosts(userID.id).then((posts) => {
				setPostList(posts);
			});
		}
	}, [userID.id]);

	function onClickDeleteUser() {
		if (userID.id) {
			UserAPI.deleteUser(userID.id).then(() => navigate('/'));
		}
	}
	return (
		<div className="User Profile">
			<header>{currentUser?.username}'s Profile</header>
			<section>
				<ul>
					<li>Username: {currentUser?.username}</li>
					<li>First Name: {currentUser?.firstname}</li>
					<li>Last Action: {currentUser?.lastaction}</li>
					<li>Role: {currentUser?.role}</li>
				</ul>
			</section>
			<button onClick={onClickDeleteUser}>Delete User</button>
			{postList.map((post, key) => (
				<p key={key}>ID: {post._id} || Title: {post.title} || Content: {post.content} || Post Date: {post.postdate} || Status: {post.status}</p>
			))}
		</div>
	);
}

export default UserProfile;
