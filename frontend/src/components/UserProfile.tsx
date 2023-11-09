import {UserAPI,User} from '../../apis/UserAPI';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

function UserProfile() {
	const userID = useParams();
	const [currentUser, setCurrentUser] = useState<User>();

	useEffect(() => {
		if (typeof userID.id !== 'undefined') {
			UserAPI.getUserByID(userID.id).then(setCurrentUser);
		}
	}, [userID.id]);

	return (
		<div className="User Profile">
			<header>{currentUser?.username}'s Profile</header>
			<section>
				<ul>
					<li>Username: {currentUser?.username}</li>
					<li>First Name: {currentUser?.firstname}</li>
					<li>Last Action: {currentUser?.lastaction}</li>
				</ul>
			</section>
		</div>
	);
}

export default UserProfile;
