import { Routes, Route } from "react-router-dom";
import { Home, Room, Login, Error } from "../Public";
import Nav from "../../components/Nav/Nav.jsx";

export default function PublicRouter() {
    return (
        <>
            <Nav />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/room/:roomName" element={<Room />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="*" element={<Error />} />
                </Routes>
            </main>
        </>
    );
}
