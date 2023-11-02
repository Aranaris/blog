import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import App from "./App";
import logo from "./assets/WLogo_Final.png"

function RouteSwitch() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/"><img id="logo" src={logo} alt="logo" /></Link>
                <Link to="/posts/">Blog</Link>
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
