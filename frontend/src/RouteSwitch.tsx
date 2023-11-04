import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import App from './App';
import logo from './assets/WLogo_Final.png';
import Blog from './components/Blog';
import Archive from './components/Archive';
import ArchivedPost from './components/ArchivedPost';

function RouteSwitch() {
	return (
		<BrowserRouter>
			<nav>
				<Link to="/"><img id="logo" src={logo} alt="logo" /></Link>
				<Link to="/posts/">Archive</Link>
				<Link to="/users/">About</Link>
			</nav>
			<Routes>
				<Route path="/" element={<Blog />}/>
				<Route path="/posts/" element={<Archive />}/>
				<Route path="/users/" element={<App />}/>
				<Route path="/posts/:id" element={<ArchivedPost />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default RouteSwitch;
