import React from 'react';
import pageNotFoundImage from '../../images/undraw_page_not_found.svg';
import styles from './styles.module.css';
import useDocumentTitle from '../../utils/useDocumentTitle';

const PageNotFound = () => {
    useDocumentTitle("Page Not Found | Liquid Hiring");
    return (
        <div className={styles.page_not_found_container}>
            <h1>Page Not Found!</h1>
            <img src={pageNotFoundImage} alt="page-not-found" />
            <div className={styles.page_not_found_text}>
                <h2>Hard work is one thing, but working yourself into the ground with unsustainable habits isn't helping anyone.</h2>
                <h2>So stop looking for non-existing pages!</h2>
            </div>
        </div>
    )
}

export default PageNotFound;