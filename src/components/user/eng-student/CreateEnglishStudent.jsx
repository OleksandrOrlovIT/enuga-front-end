import {useNavigate} from "react-router-dom";
import React from "react";
import EditEnglishStudent from "./EditEnglishStudent";

const CreateEnglishStudent = () => {
    const navigate = useNavigate();

    const englishStudent = {
        id: "",
        user: {
            id: ""
        },
        englishTeacherId: ""
    }

    return <EditEnglishStudent englishStudent={englishStudent} onSuccess={() => navigate("/admin/all-english-students/page/1")} />;
};

export default CreateEnglishStudent;