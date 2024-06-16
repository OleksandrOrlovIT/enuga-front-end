import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import api from "../../auth/api";
import EditEnglishStudent from "./EditEnglishStudent";

const LoadEnglishStudentToEdit = () => {
    const { englishStudentId } = useParams();
    const [englishStudent, setEnglishStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getEnglishTeacher = async () => {
            try {
                const response = await api.get(`/english-student/${englishStudentId}`);
                setEnglishStudent(response.data);
            } catch (error) {
                console.error('Error fetching english student:', error);
            } finally {
                setLoading(false);
            }
        };

        getEnglishTeacher();
    }, [englishStudentId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!englishStudent) {
        return <p>Error loading English Student</p>;
    }

    return <EditEnglishStudent englishStudent={englishStudent} onSuccess={() => navigate("/admin/all-english-students/page/1")} />;
};

export default LoadEnglishStudentToEdit;