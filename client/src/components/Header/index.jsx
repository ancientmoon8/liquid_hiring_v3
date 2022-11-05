import React from 'react';
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { userDetailsContext } from "../../contexts/userDetailsContext";
import { confirm } from "react-confirm-box";

const Header = () => {
    const context = useContext(userDetailsContext);
    const options = {
        message: "Are you sure you want to logout?",
        render: (message, onConfirm, onCancel) => {
            return (
                <div className={styles.confirmBox}>
                    <div className={styles.confirmBoxMessage}>
                        <h1 className={styles.confirmBoxMessageText}>{message}</h1>
                        <div className={styles.confirmBoxButtons}>
                            <button className={styles.confirmBoxButton} onClick={onConfirm}>Yes</button>
                            <button className={styles.confirmBoxButton} onClick={onCancel}>No</button>
                        </div>
                    </div>
                </div>
            );
        }
    };
    const handleLogout = async () => {
        const result = await confirm("Are you sure you want to logout?", options);
        if (result) {
            context.setUserDetails = {
                user: {}
            };
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
        }
    };
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>
                <h1>Liquid Hiring</h1>
            </Link>
            {!localStorage.getItem("isLoggedIn") ?
                <div className={styles.nav_links}>
                    <Link to="/">
                        <button type="button" className={styles.white_btn}>Home</button>
                    </Link>
                    <Link to="/about-us">
                        <button type="button" className={styles.white_btn}>
                            About Us
                        </button>
                    </Link>
                    <Link to="/contact-us">
                        <button type="button" className={styles.white_btn}>
                            Contact Us
                        </button>
                    </Link>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
                :
                <div className="dashboard_header">
                    <div className={styles.nav_links}>
                        <Link to="/dashboard">
                            <button type="button" className={styles.white_btn}>
                                Dashboard
                            </button>
                        </Link>
                        <Link to="/dashboard/update">
                            <button type="button" className={styles.white_btn}>
                                Update
                            </button>
                        </Link>
                        <Link to="/dashboard/jobs">
                            <button type="button" className={styles.white_btn}>
                                Jobs
                            </button>
                        </Link>
                        <Link to="/dashboard/applications">
                            <button type="button" className={styles.white_btn}>
                                Applications
                            </button>
                        </Link>
                        <button className={styles.white_btn} onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            }
        </nav >
    );
};

export default Header;