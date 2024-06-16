import {useNavigate} from "react-router-dom";
import React from "react";
import EditUser from "./EditUser";

const CreateUserAsAdmin = () => {
    const navigate = useNavigate();

    const user = {
        email : "",
        firstName : "",
        lastName : "",
        password : "",
        roles : []
    }

    return <EditUser user={user} onSuccess={() => navigate("admin/all-users/page/1")} />;
};

export default CreateUserAsAdmin;