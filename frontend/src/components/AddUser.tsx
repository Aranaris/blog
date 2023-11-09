import '../styles/AddUser.css';
import {UserAPI} from '../../apis/UserAPI';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function AddUser() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [userFirstName, setUserFirstName] = useState('');

	function onUsernameChange(event:React.FormEvent<HTMLInputElement>) {
		setUsername(event.currentTarget.value);
	}

	function onPasswordChange(event:React.FormEvent<HTMLInputElement>) {
		setPassword(event.currentTarget.value);
	}

	function onFirstNameChange(event:React.FormEvent<HTMLInputElement>) {
		setUserFirstName(event.currentTarget.value);
	}

	function onSubmitHandler (event:React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = {
			'username': username,
			'password': password,
			'firstname': userFirstName,
		};
		UserAPI.createUser(formData).then((user)=> navigate(`/users/${user._id}`));
	}

	return (
		<div className="Add User">
			<header>Add New User</header>
			<form id="add-user-form" onSubmit={onSubmitHandler}>
				<label htmlFor='new-username'>
					Username:
				</label>
				<input className='username' id='new-username' type='text' onChange={onUsernameChange}></input>
				<label htmlFor='new-password'>
					Password:
				</label>
				<input className='password' id='new-password' type='password' onChange={onPasswordChange}></input>
				<label htmlFor='new-firstname'>
					First Name:
				</label>
				<input className='firstname' id='new-firstname' type='text' onChange={onFirstNameChange}></input>
				<button type='submit' >Create User</button>
			</form>
		</div>
	);
}

export default AddUser;
