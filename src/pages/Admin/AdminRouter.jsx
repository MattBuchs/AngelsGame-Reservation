import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../Admin";
import { Error } from "../Public";

export default function AdminRouter() {
    return (
        <>
            <main>
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="*" element={<Error />} />
                </Routes>
            </main>
        </>
    );
}
