import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import api from "../auth/api";
import {Box, CircularProgress, List, PaginationItem, Paper, Typography} from "@mui/material";
import TestStatListItem from "../test-stat/english-test/TestStatListItem";
import Pagination from "@mui/material/Pagination";

const LastStudentTestAttemptsList = () => {
    const { englishTeacherId, englishStudentId, pageNumber } = useParams();
    const [lastStats, setLastStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const pageSize = 5;

    useEffect(() => {
        const fetchLastStats = async () => {
            setLoading(true);
            try {
                const response =
                    await api.post('/english-student/english-tests-attempts-page/by-teacher', {
                    englishStudentId,
                    englishTeacherId,
                    pageNumber: pageNumber ? pageNumber - 1 : 0,
                    pageSize
                });
                setLastStats(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching last students english tests stats:', error);
                navigate("/home");
            } finally {
                setLoading(false);
            }
        };

        fetchLastStats();
    }, [navigate, pageSize, pageNumber, englishStudentId, englishTeacherId]);

    const handlePageChange = (event, value) => {
        navigate(`/english-tests/stats/eng-teacher/${englishTeacherId}/eng-student/${englishStudentId}/${value}`);
    };

    return (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
            <Paper sx={{ width: '100%', maxWidth: 800, p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Student with ID {englishStudentId} Last {lastStats.length} Test Attempt Statistics
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <List sx={{ width: '100%' }}>
                        {lastStats.map((stat, index) => (
                            <TestStatListItem key={index} testAttempt={stat} />
                        ))}
                    </List>
                )}
                <Pagination
                    count={totalPages}
                    page={Number(pageNumber) || 1}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/english-tests/stats/eng-teacher/${englishTeacherId}/eng-student/${englishStudentId}/${item.page}`}
                            {...item}
                        />
                    )}
                    boundaryCount={1}
                    siblingCount={2}
                    sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                />
            </Paper>
        </Box>
    );
};

export default LastStudentTestAttemptsList;