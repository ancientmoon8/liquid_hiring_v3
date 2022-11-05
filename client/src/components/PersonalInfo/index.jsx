import useDocumentTitle from "../../utils/useDocumentTitle";
import styles from "./styles.module.css";
import { useState } from "react";

const PersonalInfo = (props) => {
    useDocumentTitle("Update Personal Info | Liquid Hiring");
    const [error, setError] = useState("");
    let data = props.attribute.data;
    let handleChange = props.attribute.handleChangeInput;
    let nextStep = props.attribute.nextStep;
    const handleContinue = (e) => {
        e.preventDefault();
        if (data.fatherName === "") {
            setError("Please enter your father's name");
        }
        else if (data.motherName === "") {
            setError("Please enter your mother's name");
        }
        else if (data.dateOfBirth === "") {
            setError("Please enter your date of birth");
        }
        else if (data.gender === "") {
            setError("Please enter select your gender");
        }
        else if (data.maritalStatus === "") {
            setError("Please enter select your marital status");
        }
        else {
            nextStep();
        }
    };
    return (
        <div className={styles.personalinfo_container}>
            <div className={styles.personalinfo_form_container}>
                <div className={styles.right}>
                    <form className={styles.form_container}>
                        <h1>Update Personal Info</h1>
                        <input
                            type="text"
                            placeholder="Father's Name"
                            name="fatherName"
                            onChange={handleChange("fatherName")}
                            value={data.fatherName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Mother's Name"
                            name="motherName"
                            onChange={handleChange("motherName")}
                            value={data.motherName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="date"
                            name="dateOfBirth"
                            onChange={handleChange("dateOfBirth")}
                            value={data.dateOfBirth}
                            required
                            className={styles.input} />
                        <select
                            name="gender"
                            onChange={handleChange("gender")}
                            required
                            className={styles.input}
                            value={data.gender}
                        >
                            <option>Select Gender</option>
                            <option value="f">Female</option>
                            <option value="m">Male</option>
                        </select>
                        <select
                            name="maritalStatus"
                            onChange={handleChange("maritalStatus")}
                            required
                            className={styles.input}
                            value={data.maritalStatus}
                        >
                            <option>Select Marital Status</option>
                            <option value="u">Unmarried</option>
                            <option value="m">Married</option>
                        </select>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <div className={styles.btn_container}>
                            <button onClick={handleContinue} className={styles.green_btn}>Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;