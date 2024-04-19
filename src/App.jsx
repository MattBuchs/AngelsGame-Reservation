import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getData } from "./features/rooms.js";
import PublicRouter from "./pages/Public/PublicRouter.jsx";
import AdminRouter from "./pages/Admin/AdminRouter.jsx";
import AuthGuard from "./helpers/AuthGuard.jsx";

function App() {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms);

    if (!rooms.roomsData && !rooms.loading && !rooms.error) {
        dispatch(getData());
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<PublicRouter />} />
                <Route
                    path="/admin/*"
                    element={
                        <AuthGuard>
                            <AdminRouter />
                        </AuthGuard>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
