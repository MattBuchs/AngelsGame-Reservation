import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getData } from "./features/rooms.js";
import Nav from "./components/Nav/nav.jsx";
import Home from "./components/Home/Home.jsx";
import Room from "./components/Room/Room.jsx";
import Admin from "./components/Admin/Admin.jsx";
import Login from "./components/Login/Login.jsx";

function App() {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms);

    if (!rooms.roomsData && !rooms.loading && !rooms.error) {
        dispatch(getData());
    }

    return (
        <BrowserRouter>
            <Nav />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/room/:roomName" element={<Room />} />
                    <Route path="/dashboard" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
