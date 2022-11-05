import useDocumentTitle from "../../utils/useDocumentTitle";
import styles from "./styles.module.css";
import { useState } from "react";

const EducationalInfo = (props) => {
    useDocumentTitle("Update Educational Info | Liquid Hiring");
    const [error, setError] = useState("");
    let data = props.attribute.data;
    let handleChange = props.attribute.handleChangeInput;
    let nextStep = props.attribute.nextStep;
    let prevStep = props.attribute.prevStep;
    const handleContinue = (e) => {
        e.preventDefault();
        if (data.highSchoolBoard === "") {
            setError("Please enter your high school board");
        }
        else if (data.highSchoolPassingYear === "") {
            setError("Please enter your high school passing year");
        }
        else if (data.highSchoolPercentage === "") {
            setError("Please enter your high school percentage");
        }
        else if (data.highSchoolMarksheetFile === null) {
            setError("Please upload your high school marksheet");
        }
        else if (data.intermediateBoard === "") {
            setError("Please enter your intermediate board");
        }
        else if (data.intermediatePassingYear === "") {
            setError("Please enter your intermediate passing year");
        }
        else if (data.intermediatePercentage === "") {
            setError("Please enter your intermediate percentage");
        }
        else if (data.intermediateMarksheetFile === null) {
            setError("Please upload your intermediate marksheet");
        }
        else {
            console.log("highSchoolMarksheetFile", data.highSchoolMarksheetFile);
            nextStep();
        }
    };
    const handleBack = (e) => {
        e.preventDefault();
        prevStep();
    };
    return (
        <div className={styles.educationalinfo_container}>
            <div className={styles.educationalinfo_form_container}>
                <div className={styles.right}>
                    <form className={styles.form_container}>
                        <h1>Update Educational Info</h1>
                        <input
                            type="text"
                            placeholder="High School Board"
                            name="highSchoolBoard"
                            onChange={handleChange("highSchoolBoard")}
                            value={data.highSchoolBoard}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="High School Passing Year"
                            name="highSchoolPassingYear"
                            onChange={handleChange("highSchoolPassingYear")}
                            value={data.highSchoolPassingYear}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="High School Percentage"
                            name="highSchoolPercentage"
                            onChange={handleChange("highSchoolPercentage")}
                            value={data.highSchoolPercentage}
                            required
                            className={styles.input}
                        />
                        <input
                            type="file"
                            placeholder="High School Marksheet"
                            name="highSchoolMarksheetFile"
                            onChange={props.attribute.handleChangeFile("highSchoolMarksheetFile")}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Intermediate Board"
                            name="intermediateBoard"
                            onChange={handleChange("intermediateBoard")}
                            value={data.intermediateBoard}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Intermediate Passing Year"
                            name="intermediatePassingYear"
                            onChange={handleChange("intermediatePassingYear")}
                            value={data.intermediatePassingYear}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Intermediate Percentage"
                            name="intermediatePercentage"
                            onChange={handleChange("intermediatePercentage")}
                            value={data.intermediatePercentage}
                            required
                            className={styles.input}
                        />
                        <input
                            type="file"
                            placeholder="Intermediate Marksheet"
                            name="intermediateMarksheetFile"
                            onChange={props.attribute.handleChangeFile("intermediateMarksheetFile")}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <div className={styles.btn_container}>
                            <button onClick={handleBack} className={styles.green_btn}>Back</button>
                            <button onClick={handleContinue} className={styles.green_btn}>Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EducationalInfo;