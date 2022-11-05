import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import useDocumentTitle from "../../utils/useDocumentTitle";

const ContactUs = () => {
    useDocumentTitle("Contact Us | Liquid Hiring");
    const [data, setData] = useState({
        fullName: "",
        email: "",
        message: "",
    });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/contact";
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.contactus_container}>
            <div className={styles.contactus_form_container}>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Contact Us</h1>
                        <p>Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            <br /> Or, you can email us directly at <a href="mailto:support@liquidhiring.com">support@liquidhiring.com</a></p>
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            onChange={handleChange}
                            value={data.fullName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Message"
                            name="message"
                            onChange={handleChange}
                            value={data.message}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;