import {Box, Button, CircularProgress, List, PaginationItem, Typography} from "@mui/material";
import TestStatListItem from "./TestStatListItem";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../auth/AuthContext";
import api from "../../auth/api";
import Words from "../../word/Words";
import {Link, useNavigate} from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const LastTestAttemptsList = ({ pageSize, pageNumber, isMinimized }) => {
    const { user } = useContext(AuthContext);
    const [lastStats, setLastStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLastStats = async () => {
            setLoading(true);
            try {
                const response = await api.post('/test-attempts/user/stats-list-last', {
                    "userId": user.id,
                    "pageNumber": (pageNumber ? pageNumber - 1 : 0),
                    "pageSize": pageSize
                });
                console.log("response.data = ", response.data);
                setLastStats(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching last stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLastStats();
    }, [user.id, pageSize, pageNumber]);

    const handlePageChange = (event, value) => {
        navigate(`/english-tests/stats/${value}`);
    };

    return (
        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom>
                Your Last {lastStats.length} Test Attempt Statistics
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {lastStats.map((stat, index) => (
                        <TestStatListItem key={index} testAttempt={stat} />
                    ))}
                </List>
            )}
            {!isMinimized && (
                <Pagination
                    count={totalPages}
                    page={pageNumber}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/english-tests/stats/${item.page}`}
                            {...item}
                        />
                    )}
                    boundaryCount={1}
                    siblingCount={2}
                    style={{ marginTop: '20px', alignSelf: 'center' }}
                />
            )}
            {isMinimized && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/english-tests/stats/1`)}
                    style={{ marginTop: 'auto', alignSelf: 'center' }}
                >
                    <Words text="View All Statistics" />
                </Button>
            )}
        </Box>
    );
};

export default LastTestAttemptsList;