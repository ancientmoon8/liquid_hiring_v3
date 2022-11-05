// import useDocumentTitle from "../../utils/useDocumentTitle";
// import styles from "./styles.module.css";
// import { useState } from "react";
// import axios from "axios";

// const PersonalInfo = (props) => {
//     useDocumentTitle("Confirm Info | Liquid Hiring");    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = "http://localhost:8080/api/dashboard/update";
//             // Create a post request to the url and search user with id and update the data
//             const _id = context.userDetails.user._id;
//             const { data: res } = await axios.post(url, { _id, data });
//             const userDetails = {
//                 user: res.user,
//             };
//             context.setUserDetails(userDetails);

//             setMsg("Updated Successfully");
//         } catch (error) {
//             if (
//                 error.response &&
//                 error.response.status >= 400 &&
//                 error.response.status <= 500
//             ) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     return (
//         <div className={styles.updateinfo_container}>
//             <div className={styles.updateinfo_form_container}>
//                 <div className={styles.right}>
                    
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PersonalInfo;