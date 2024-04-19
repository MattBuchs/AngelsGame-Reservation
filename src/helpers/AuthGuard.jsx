import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
    let logged = false;

    if (!logged) return <Navigate to="/login" />;

    return children;
}
