import useDocumentTitle from "../../utils/useDocumentTitle";
import styles from "./styles.module.css";
import { useState } from "react";
import countriesData from "../../data/countryData.json";

const PostalInfo = (props) => {
    useDocumentTitle("Update Postal Info | Liquid Hiring");
    const [error, setError] = useState("");
    let data = props.attribute.data
    let handleChange = props.attribute.handleChangeInput;
    let nextStep = props.attribute.nextStep;
    let prevStep = props.attribute.prevStep;
    const handleContinue = (e) => {
        e.preventDefault();
        if (data.streetAddress1 === "") {
            setError("Please enter your street address");
        }
        else if (data.city === "") {
            setError("Please enter your city");
        }
        else if (data.state === "") {
            setError("Please enter your state");
        }
        else if (data.pincode === "") {
            setError("Please enter your pincode");
        }
        else if (data.country === "") {
            setError("Please select your country");
        }
        else if (data.mobileNumber === "") {
            setError("Please enter your mobile number");
        }
        else {
            nextStep();
        }
    };
    const handleBack = (e) => {
        e.preventDefault();
        prevStep();
    };

    return (
        <div className={styles.postalinfo_container}>
            <div className={styles.postalinfo_form_container}>
                <div className={styles.right}>
                    <form className={styles.form_container}>
                        <h1>Update Postal Info</h1>
                        <input
                            type="text"
                            placeholder="Street Address 1"
                            name="streetAddress1"
                            onChange={handleChange("streetAddress1")}
                            value={data.streetAddress1}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Street Address 2 (Optional)"
                            name="streetAddress2"
                            onChange={handleChange("streetAddress2")}
                            value={data.streetAddress2}
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="City"
                            name="city"
                            onChange={handleChange("city")}
                            value={data.city}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="State"
                            name="state"
                            onChange={handleChange("state")}
                            value={data.state}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Pincode"
                            name="pincode"
                            onChange={handleChange("pincode")}
                            value={data.pincode}
                            required
                            className={styles.input}
                        />
                        <select
                            className={styles.input}
                            name="country"
                            onChange={handleChange("country")}
                            required
                            value={data.country}
                        >
                            <option>Select Country</option>
                            {countriesData ? countriesData.map((country) => (
                                <option key={country.name} value={country.code}>
                                    {country.name}
                                </option>
                            )) : <option>No Country</option>}
                        </select>
                        <input type="tel" placeholder="Phone Number" name="mobileNumber" onChange={handleChange("mobileNumber")} value={data.mobileNumber} required className={styles.input} />
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

export default PostalInfo;