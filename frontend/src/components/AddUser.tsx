import '../styles/AddUser.css';
import {UserAPI, User} from '../../apis/UserAPI';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function AddUser() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [userFirstName, setUserFirstName] = useState('');
	const [userRole, setUserRole] = useState('new user');
	const [errors, setErrors] = useState<User['errors']>([]);

	function onUsernameChange(event:React.FormEvent<HTMLInputElement>) {
		setUsername(event.currentTarget.value);
	}

	function onPasswordChange(event:React.FormEvent<HTMLInputElement>) {
		setPassword(event.currentTarget.value);
	}

	function onFirstNameChange(event:React.FormEvent<HTMLInputElement>) {
		setUserFirstName(event.currentTarget.value);
	}

	function onRoleSelect(event:React.FormEvent<HTMLSelectElement>) {
		setUserRole(event.currentTarget.value);
	}

	function onSubmitHandler (event:React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = {
			'username': username,
			'password': password,
			'firstname': userFirstName,
			'role': userRole,
		};

		UserAPI.createUser(formData)
			.then((user)=> {
				if(typeof user.errors != 'undefined') {
					setErrors(user.errors);
				} else {
					navigate(`/users/${user._id}`);
				}
			});
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
				<label htmlFor='new-userrole'>
					Role:
				</label>
				<select onChange={onRoleSelect} className='role' id='new-userrole'>
					<option value='new user'>New User</option>
					<option value='member'>Member</option>
					<option value='admin'>Administrator</option>
				</select>
				{typeof errors !== 'undefined' && errors.map((error, key) => (
					<div key={key}>{error.msg}</div>
				))}
				<button type='submit' >Create User</button>
			</form>

		</div>
	);
}

export default AddUser;
