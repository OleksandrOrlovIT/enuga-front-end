import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../auth/AuthContext";
import {Link, useNavigate, useParams} from "react-router-dom";
import api from "../../auth/api";
import {Box, Button, CircularProgress, Container, Grid, PaginationItem, Paper, Typography} from "@mui/material";
import WordModuleCard from "../WordModuleCard";
import Pagination from "@mui/material/Pagination";
import Words from "../../word/Words";

const UserWordModulesPage = ({ pageSize, pageNumber }) => {
    const { user } = useContext(AuthContext);
    const [lastWordModules, setLastWordModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLastWordModules = async () => {
            setLoading(true);
            try {
                const response = await api.post('/word-module/user', {
                    userId: user.id,
                    pageNumber: pageNumber ? pageNumber - 1 : 0,
                    pageSize: pageSize
                });
                setLastWordModules(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching last word modules:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLastWordModules();
    }, [user.id, pageSize, pageNumber]);

    const handlePageChange = (event, value) => {
        navigate(`/word-modules/user/${value}`);
    };

    return (
        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom>
                Your {lastWordModules.length} Word Modules
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {lastWordModules.map((wordModule) => (
                        <Grid item key={wordModule.id} xs={12} sm={6} md={4}>
                            <WordModuleCard wordModule={wordModule} userId={user.id} />
                        </Grid>
                    ))}
                </Grid>
            )}
            <Pagination
                count={totalPages}
                page={pageNumber}
                onChange={handlePageChange}
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`/word-modules/user/${item.page}`}
                        {...item}
                    />
                )}
                boundaryCount={1}
                siblingCount={2}
                style={{ marginTop: '20px', alignSelf: 'center' }}
            />
            <Grid container justifyContent="right" style={{ marginTop: '20px', marginRight: '400px' }}>
                <Link to={`/word-modules/create`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" sx={{ fontSize: '1.0rem', padding: '10px 20px' }}>
                        <Words text="Create Word Module" />
                    </Button>
                </Link>
            </Grid>
        </Box>
    );
};

export default UserWordModulesPage;