import {useNavigate} from "react-router-dom";
import React from "react";
import EditEnglishTeacher from "./EditEnglishTeacher";

const CreateEnglishTeacher = () => {
    const navigate = useNavigate();

    const englishTeacher = {
        id: "",
        user: {
            id: ""
        }
    }

    return <EditEnglishTeacher englishTeacher={englishTeacher} onSuccess={() => navigate("/admin/all-english-teachers/page/1")} />;
};

export default CreateEnglishTeacher;