import styles from "./styles.module.css";
import hiringImage from "../../images/undraw_hiring.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import useDocumentTitle from "../../utils/useDocumentTitle.js";

const Home = () => {
    return (
        useDocumentTitle("Home | Liquid Hiring"),
        <>
            <section>
                <div className={styles.home_container_1}>
                    <div className={styles.home_container_1_left}>
                        <h2>Rendezvous for the job seekers and the recruiters...</h2>
                        <h3>A one stop solution to your job-hunt struggle!</h3>
                    </div>
                    <div className={styles.home_container_1_right}>
                        <img src={hiringImage} alt="hiringImage" className={styles.hiring_img} />
                    </div>
                </div>
                <div className={styles.curve}></div>
            </section>
        </>
    );
};

export default Home;
