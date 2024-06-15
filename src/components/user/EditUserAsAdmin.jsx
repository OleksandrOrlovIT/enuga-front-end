import React, {useEffect, useState} from 'react';
import EditUser from "../user/EditUser";
import {useNavigate, useParams} from "react-router-dom";
import api from "../auth/api";

const EditUserAsAdmin = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get(`/user/${id}`);
                console.log("response.data = ", response.data);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [id]);

    console.log("user ", user);

    if (loading) {
        return <p>Loading...</p>;
    }

    return <EditUser user={user} onSuccess={() => navigate("/all-users/page/1")} />;
};

export default EditUserAsAdmin;