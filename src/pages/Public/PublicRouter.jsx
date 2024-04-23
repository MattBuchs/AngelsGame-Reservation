import { Routes, Route } from "react-router-dom";
import { Home, Room, Login, Prices, Reservation, Error } from "../Public";
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
                    <Route path="/reservation" element={<Reservation />} />
                    <Route path="/prices" element={<Prices />} />

                    <Route path="*" element={<Error />} />
                </Routes>
            </main>
        </>
    );
}
