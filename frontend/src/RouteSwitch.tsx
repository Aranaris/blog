import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import App from "./App";

function RouteSwitch() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/posts/">Posts</Link>
                <Link to="/users/">Users</Link>
            </nav>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/users/" element={<App />}/>
                <Route path="/posts/" element={<App />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;
