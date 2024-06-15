import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../auth/AuthContext";
import {useParams} from "react-router-dom";
import api from "../auth/api";
import AllEnglishStudentsPage from "./AllEnglishStudentsPage";

const TeacherStudentsPage = () => {
    const {user} = useContext(AuthContext);
    const {pageNumber} = useParams();
    const [englishTeacher, setEnglishTeacher] = useState({});

    useEffect(() => {
        const fetchEnglishTeacher = async () => {
            try {
                const response = await api.get(`/english-teacher/user/${user.id}`);
                setEnglishTeacher(response.data);
            } catch (error) {
                console.error('Error fetching englishTeacher:', error);
            }
        };

        fetchEnglishTeacher();
    }, [user.id, pageNumber]);

    return (
        <AllEnglishStudentsPage englishTeacher={englishTeacher} pageNumber={pageNumber}/>
    );
};

export default TeacherStudentsPage;