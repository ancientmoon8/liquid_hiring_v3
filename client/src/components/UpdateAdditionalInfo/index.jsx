import { useState } from "react";
import PersonalInfo from "../PersonalInfo";
import PostalInfo from "../PostalInfo";
import EducationalInfo from "../EducationalInfo";
import HigherEducationalInfo from "../HigherEducationalInfo";
// import ConfirmInfo from "../ConfirmInfo";
// import SuccessInfoUpdation from "../SuccessInfoUpdation";

const UpdateAdditionalInfo = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        // Personal Info
        fatherName: "",
        motherName: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        // Postal Details
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobileNumber: "",
        // Educational Details
        highSchoolBoard: "",
        highSchoolPassingYear: "",
        highSchoolPercentage: "",
        highSchoolMarksheetFile: null,
        intermediateBoard: "",
        intermediatePassingYear: "",
        intermediatePercentage: "",
        intermediateMarksheetFile: null,
        // Higher Education Details
        numberOfDegrees: "",
        higherEducation: [{ degreeName: "", degreeCollege: "", degreePassingYear: "", degreePercentage: "", degreeFile: null }],
        // Professional Details
        skills: "",
        languages: "",
        achievements: "",
        projects: "",
        certifications: "",
        resume: "",
    });

    const handleChangeInput = (i) => (e) => {
        setData({ ...data, [i]: e.target.value });
    };

    const handleChangeFile = (i) => (e) => {
        setData({ ...data, [i]: e.target.files[0] });
    };

    const nextStep = () => {
        setStep(step + 1);
    };
    const prevStep = () => {
        setStep(step - 1);
    };
    const props = { data, handleChangeInput, handleChangeFile, nextStep, prevStep };
    switch (step) {
        case 1: try {
            return <PersonalInfo attribute={props} />
        } catch (error) {
            console.log("Error in PersonalInfo Step: ", error);
        }
            break;
        case 2: try {
            return <PostalInfo attribute={props} />
        } catch (error) {
            console.log("Error in PostalInfo Step: ", error);
        }
            break;
        case 3: try {
            return <EducationalInfo attribute={props} />
        } catch (error) {
            console.log("Error in EducationalInfo Step: ", error);
        }
            break;
        case 4: try {
            return <HigherEducationalInfo attribute={props} />
        } catch (error) {
            console.log("Error in HigherEducationalInfo Step: ", error);
        }
            break;
        // case 5: try {
        //     return <ConfirmInfo attribute={props} />
        // } catch (error) {
        //     console.log("Error in ConfirmInfo Step: ", error);
        // }
        //     break;
        // case 6:
        //     return <SuccessInfoUpdation />;
        default: console.log("Error in multi step form");
    }
};

export default UpdateAdditionalInfo;