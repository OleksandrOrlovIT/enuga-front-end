import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../auth/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import api from "../../auth/api";
import {Box, CircularProgress, Grid, PaginationItem, Typography} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import WordModuleCard from "../WordModuleCard";

const PublicWordModulesWithoutUserPage = ({ pageSize, pageNumber }) => {
    const { user } = useContext(AuthContext);
    const [lastWordModules, setLastWordModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLastWordModules = async () => {
            setLoading(true);
            try {
                const response = await api.post('/word-module/public-without-logged-user', {
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
        navigate(`/word-modules/public/${value}`);
    };

    return (
        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom>
                {lastWordModules.length} Public Word Modules
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
                        to={`/word-modules/public/${item.page}`}
                        {...item}
                    />
                )}
                boundaryCount={1}
                siblingCount={2}
                style={{ marginTop: '20px', alignSelf: 'center' }}
            />
        </Box>
    );
};

export default PublicWordModulesWithoutUserPage;