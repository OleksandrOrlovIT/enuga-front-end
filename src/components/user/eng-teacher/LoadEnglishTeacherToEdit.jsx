import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import api from "../../auth/api";
import EditEnglishTeacher from "./EditEnglishTeacher";

const LoadEnglishTeacherToEdit = () => {
    const { englishTeacherId } = useParams();
    const [englishTeacher, setEnglishTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getEnglishTeacher = async () => {
            try {
                const response = await api.get(`/english-teacher/${englishTeacherId}`);
                setEnglishTeacher(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        getEnglishTeacher();
    }, [englishTeacherId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!englishTeacher) {
        return <p>Error loading English Teacher</p>;
    }

    return <EditEnglishTeacher englishTeacher={englishTeacher} onSuccess={() => navigate("/admin/all-english-teachers/page/1")} />;
};

export default LoadEnglishTeacherToEdit;