import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PrivateWrapper = () => {
    return localStorage.getItem("isLoggedIn") ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;