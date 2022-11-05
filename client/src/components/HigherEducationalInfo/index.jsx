import styles from "./styles.module.css";
import useDocumentTitle from "../../utils/useDocumentTitle";
import React, { useState } from 'react';

const HigherEducationalInfo = (props) => {
    useDocumentTitle("Update Higher Educational Info | Liquid Hiring");
    const [degree, setdegree] = useState(props.attribute.data.higherEducation);
    // const [error, setError] = useState("");
    let handleChange = (i, e) => {
        let newdegree = [...degree];
        newdegree[i][e.target.name] = e.target.value;
        setdegree(newdegree);
    };

    let handleChangeFile = (i, e) => {
        let newdegree = [...degree];
        newdegree[i][e.target.name] = e.target.files[0];
        setdegree(newdegree);
    };

    let addFormFields = () => {
        setdegree([...degree, { degreeName: "", degreeCollege: "", degreePassingYear: "", degreePercentage: "" }]);
    };

    let removeFormFields = (i) => {
        let newdegree = [...degree];
        newdegree.splice(i, 1);
        setdegree(newdegree)
    };

    const handleContinue = (e) => {
        e.preventDefault();
        props.attribute.setData({ ...props.attribute.data, higherEducation: degree });
        props.attribute.nextStep();
    };

    const handleBack = (e) => {
        e.preventDefault();
        props.attribute.prevStep();
    };

    return (
        <div className={styles.highereducationalinfo_container}>
            <div className={styles.highereducationalinfo_form_container}>
                <div className={styles.right}>
                    <form className={styles.form_container}>
                        <h1>Update Higher Education Info</h1>
                        {degree.map((element, index) => (
                            <div key={index} className={styles.form_container}>
                                <h2>Enter Info For Degree {index + 1}</h2>
                                <input type="text" name="degreeName" placeholder="Name of Degree" value={element.degreeName || ""} onChange={e => handleChange(index, e)} className={styles.input} />
                                <input type="text" name="degreeCollege" placeholder="Name of College" value={element.degreeCollege || ""} onChange={e => handleChange(index, e)} className={styles.input} />
                                <input type="text" name="degreePassingYear" placeholder="Passing Year of Degree" value={element.degreePassingYear || ""} onChange={e => handleChange(index, e)} className={styles.input} />
                                <input type="text" name="degreePercentage" placeholder="Total Percentage in Degree" value={element.degreePercentage || ""} onChange={e => handleChange(index, e)} className={styles.input} />
                                <input type="file" name="degreeFile" placeholder="Upload Degree Certificate" value={element.degreeFile || ""} onChange={e => handleChangeFile(index, e)} className={styles.input} />
                                {
                                    index ?
                                        <button type="button" className={styles.green_btn} onClick={() => removeFormFields(index)}>Remove Degree {index + 1}</button>
                                        : null
                                }
                            </div>
                        ))}
                        {/* {error && <div className={styles.error_msg}>{error}</div>} */}
                        <div className={styles.btn_container}>
                            <button className={styles.green_btn} type="button" onClick={() => addFormFields()}>Add Degree</button>
                            <button onClick={handleBack} className={styles.green_btn}>Back</button>
                            <button onClick={handleContinue} className={styles.green_btn}>Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HigherEducationalInfo;
