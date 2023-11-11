import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import App from './App';
import logo from './assets/WLogo_Final.png';
import Blog from './components/Blog';
import Archive from './components/Archive';
import ArchivedPost from './components/ArchivedPost';
import LoginPage from './components/LoginPage';
import AddPost from './components/AddPost';
import AddUser from './components/AddUser';
import UserProfile from './components/UserProfile';
import {UserAPI} from '../apis/UserAPI';
import LogoutPage from './components/LogoutPage';

function RouteSwitch() {
	function onClickLogout() {
		UserAPI.logoutUser();
	}
	return (
		<BrowserRouter>
			<nav>
				<Link to="/"><img id="logo" src={logo} alt="logo" /></Link>
				<Link to="/posts/">Archive</Link>
				<Link to="/users/">About</Link>
				<Link to="/posts/add">Add Post</Link>
				<Link to="/users/add">Add User</Link>
				<Link className="right-nav" to="/login/">Log In</Link>
				<Link to="/logout/" onClick={onClickLogout}>Log Out</Link>
			</nav>
			<Routes>
				<Route path="/" element={<Blog />}/>
				<Route path="/posts/" element={<Archive />}/>
				<Route path="/posts/add" element={<AddPost />}/>
				<Route path="/users/" element={<App />}/>
				<Route path="/users/add" element={<AddUser />}/>
				<Route path="/login/" element={<LoginPage />}/>
				<Route path="/logout/" element={<LogoutPage />}/>
				<Route path="/users/:id" element={<UserProfile />}></Route>
				<Route path="/posts/:id" element={<ArchivedPost />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default RouteSwitch;
