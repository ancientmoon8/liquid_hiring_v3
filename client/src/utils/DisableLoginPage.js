import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const DisableLoginPage = () => {
    return localStorage.getItem("isLoggedIn") ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default DisableLoginPage;