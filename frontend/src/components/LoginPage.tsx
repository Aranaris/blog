import {UserAPI} from '../../apis/UserAPI';
import '../styles/LoginPage.css';
import React, {useState} from 'react';

function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const onSubmitHandler = function(event:React.FormEvent<HTMLFormElement>) {
		event?.preventDefault();
		UserAPI.loginUser(username, password).then((response)=>console.log(response));
	};

	const onUsernameChange = function(event:React.FormEvent<HTMLInputElement>) {
		setUsername(event.currentTarget.value);
	};

	const onPasswordChange = function(event:React.FormEvent<HTMLInputElement>) {
		setPassword(event.currentTarget.value);
	};

	return (
		<div className="Login">
			<header>Login</header>
			<form className="login-form" onSubmit={onSubmitHandler}>
				<input type="text" name="username" placeholder='Username' onChange={onUsernameChange}></input>
				<input type="password" name="password" placeholder='Password' onChange={onPasswordChange}></input>
				<button>Sign In</button>
			</form>
		</div>
	);
}

export default LoginPage;
