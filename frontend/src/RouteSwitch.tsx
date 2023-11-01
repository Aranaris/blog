import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Button } from "./components/Button";
import App from "./App";

function RouteSwitch() {
    return (
        <BrowserRouter>
            <nav>
                <Button value="Home" children="test child"></Button>
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
