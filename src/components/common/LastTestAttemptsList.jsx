import {Button, CircularProgress, List, Paper, Typography} from "@mui/material";
import TestStatListItem from "../test-stat/TestStatListItem";
import Words from "../word/Words";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../auth/AuthContext";
import api from "../auth/api";

const LastTestAttemptsList = ({ numStats }) => {
    const { user } = useContext(AuthContext);
    const [lastStats, setLastStats] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOpenAllStats = () => {
        // Navigate to a page displaying all stats
        // Example: history.push('/all-stats');
    };

    useEffect(() => {
        const fetchLastStats = async () => {
            setLoading(true);
            try {
                const response = await api.post('/test-attempts/user/stats-list-last', {
                    userId: user.id,
                    pageNumber: 0,
                    pageSize: numStats
                });
                setLastStats(response.data.content);
            } catch (error) {
                console.error('Error fetching last stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLastStats();
    }, [user.id, numStats]);

    return (
        <Paper elevation={3} style={{ padding: '20px', flex: '1 0 45%', marginLeft: '20px' }}>
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
            <Button variant="contained" color="primary" onClick={handleOpenAllStats} style={{ marginTop: '20px' }}>
                <Words text="View All Statistics" />
            </Button>
        </Paper>
    );
};

export default LastTestAttemptsList;