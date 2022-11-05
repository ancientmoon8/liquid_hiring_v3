import React from 'react';
import styles from "./styles.module.css";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <p>© {new Date().getFullYear()} Liquid Hiring. All rights reserved.</p>
        </div >
    )
};

export default Footer;