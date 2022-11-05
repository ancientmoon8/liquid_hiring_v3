import useDocumentTitle from "../../utils/useDocumentTitle";
import { userDetailsContext } from "../../contexts/userDetailsContext";
import { useContext } from "react";
import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    useDocumentTitle("Dashboard | Liquid Hiring");
    const context = useContext(userDetailsContext);
    return (
        <div className={styles.dashboard_container}>
            <h1>Dashboard</h1>
            <div className={styles.dashboard_content}>
                <div className={styles.dashboard_left}>
                    <div className={styles.dashboard_left_content}>
                        <h2>Welcome {context.userDetails.user.firstName}!</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                            voluptates, quod, quia, voluptate quae voluptatem quibusdam
                        </p>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;