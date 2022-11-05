import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import useDocumentTitle from "../../utils/useDocumentTitle";
import { userDetailsContext } from "../../contexts/userDetailsContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const Login = () => {
	const context = useContext(userDetailsContext);
	const navigate = useNavigate();
	useDocumentTitle("Login | Liquid Hiring");
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			const userDetails = {
				user: res.user
			};
			localStorage.setItem("isLoggedIn", true);
			context.setUserDetails(userDetails);
			navigate("/dashboard");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<Link to="/forgot-password" style={{ alignSelf: "flex-start", textDecoration: "none" }}>
							<p className={styles.forgot_pass_text}>Forgot Password?</p>
						</Link>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
