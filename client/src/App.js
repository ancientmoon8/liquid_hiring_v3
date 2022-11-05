import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import { userDetailsContext } from "./contexts/userDetailsContext";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import PrivateWrapper from "./utils/PrivateWrapper";
import { Navigate } from "react-router-dom";
import DisableLoginPage from "./utils/DisableLoginPage";
import UpdateAdditionalInfo from "./components/UpdateAdditionalInfo";

function App() {
	const [userDetails, setUserDetails] = useState({
		user: {
			_id: "",
			firstName: "",
			lastName: "",
			email: "",
		}
	});
	const context = {
		userDetails,
		setUserDetails,
	};
	const redirectToDashboard = (component) => {
		if (userDetails.isLoggedIn) {
			return <Navigate to="/dashboard" />;
		} else {
			return component;
		}
	};
	return (
		<>
			<userDetailsContext.Provider value={context}>
				<Header />
				<Routes>
					<Route index path="/" element={redirectToDashboard(<Home />)} />
					<Route path="/signup" exact element={redirectToDashboard(<Signup />)} />
					<Route element={<PrivateWrapper />}>
						<Route path="/dashboard" element={<Dashboard />} >
							<Route index path="update" element={<UpdateAdditionalInfo />} />
						</Route>
					</Route>
					<Route element={<DisableLoginPage />}>
						<Route path="/login" element={<Login />} />
					</Route>
					<Route path="/login" element={redirectToDashboard(<Login />)} />
					<Route path="/users/:id/verify/:token" element={redirectToDashboard(<EmailVerify />)} />
					<Route path="/forgot-password" element={redirectToDashboard(<ForgotPassword />)} />
					<Route path="/password-reset/:id/:token" element={redirectToDashboard(<PasswordReset />)} />
					<Route path="/about-us" element={redirectToDashboard(<AboutUs />)} />
					<Route path="/contact-us" element={redirectToDashboard(<ContactUs />)} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</userDetailsContext.Provider>
			<Footer />
		</>
	);
}

export default App;
