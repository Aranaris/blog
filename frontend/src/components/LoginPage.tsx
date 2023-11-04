import '../styles/LoginPage.css';
import {api} from '../../apis/configs/fetchConfigs';

function LoginPage() {
	return (
		<div className="Login">
			<header>Login</header>
			<form className="login-form" method="POST" action={`${api.baseURL}auth/login`}>
				<input type="text" name="username" placeholder='Username'></input>
				<input type="password" name="password" placeholder='Password'></input>
				<button>Sign In</button>
			</form>
		</div>
	);
}

export default LoginPage;
