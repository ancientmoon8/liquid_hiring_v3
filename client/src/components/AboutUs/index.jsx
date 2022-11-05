import React from 'react';
import styles from "./styles.module.css";
import MayankImage from "../../images/mayank_pic.jpeg";
import OmImage from "../../images/om_pic.jpg";
import useDocumentTitle from '../../utils/useDocumentTitle';

const AboutUs = () => {
    useDocumentTitle("About Us | Liquid Hiring");
    return (
        <>
            <div className={styles.about_us_container}>
                <h1>About Us</h1>
                <div className={styles.about_us_text}>
                    <p>
                        <strong>Liquid Hiring</strong> is a platform that helps find the right candidate for companies and also helps candidates find the right job for them by providing them with a list of jobs that match their requirements. We are a team of 4 people who are passionate about technology and want to make a difference in the world.
                        We have been working on this project for the past 2 months and we are very excited to share it with you. We plan to bring recommendation systems, chatbots, and many more features to this platform in the future. We hope you enjoy using this platform as much as we enjoyed building it. Thank you!
                    </p>
                </div>
                <h1>Our Team</h1>
                <div className={styles.team_members}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className={styles.card}>
                                <div className={styles.container}>
                                    <img src={OmImage} alt="lorem-ipsum" className={styles.card_img} />
                                    <h2>Om Gonade</h2>
                                    <p className={styles.title}>Project Manager &amp; <br /> Frontend Developer</p>
                                    <p>Email: om.gonade2001@gmail.com</p>
                                    <p><button className={styles.button}><a href="mailto:om.gonade2001@gmail.com">Contact Me</a></button></p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.card}>
                                <div className={styles.container}>
                                    <img src={MayankImage} alt="lorem-ipsum" className={styles.card_img} />
                                    <h2>Mayank Kashyap</h2>
                                    <p className={styles.title}>Frontend Developer &amp; <br /> Backend Developer</p>
                                    <p>Email: contact@mayankkashyap.in</p>
                                    <p><button className={styles.button}><a href="https://www.mayankkashyap.in" target="_blank" rel="noreferrer" >Visit Website</a></button></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;