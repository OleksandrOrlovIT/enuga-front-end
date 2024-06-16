import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    PaginationItem,
    CircularProgress,
    Button
} from '@mui/material';
import api from "../../auth/api";

const AllEnglishTeachers = () => {
    const {pageNumber} = useParams();
    const [englishTeachers, setEnglishTeachers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnglishTeachers = async (page) => {
            setLoading(true);
            try {
                const response = await api.post('/english-teachers/page', {
                    pageNumber: page - 1,
                    pageSize: 10
                });
                setEnglishTeachers(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching englishTeachers:', error);
            }
            setLoading(false);
        };

        fetchEnglishTeachers(Number(pageNumber) || 1);
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        navigate(`/admin/all-english-teachers/page/${value}`);
    };

    const handleEdit = (englishTeacher) => {
        navigate(`/admin/edit-english-teacher/${englishTeacher.id}`);
    };

    const handleDelete = async (englishTeacherId) => {
        try {
            await api.delete(`/english-teacher/${englishTeacherId}`);
            setEnglishTeachers(englishTeachers.filter(user => user.id !== englishTeacherId));
        } catch (error) {
            console.error('Error deleting english teacher:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    All English Teachers
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/admin/create-english-teacher')}
                >
                    Create New English Teacher
                </Button>
            </Box>
            {loading ? (
                <CircularProgress/>
            ) : (
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>English Teacher ID</TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {englishTeachers.map((englishTeacher) => (
                                    <TableRow key={englishTeacher.id}>
                                        <TableCell>{englishTeacher.id}</TableCell>
                                        <TableCell>{englishTeacher.user.id}</TableCell>
                                        <TableCell>{englishTeacher.user.email}</TableCell>
                                        <TableCell>{englishTeacher.user.firstName}</TableCell>
                                        <TableCell>{englishTeacher.user.lastName}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleEdit(englishTeacher)}
                                                style={{marginRight: '8px'}}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDelete(englishTeacher.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}
            <Pagination
                count={totalPages}
                page={Number(pageNumber) || 1}
                onChange={handlePageChange}
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`/admin/all-english-teachers/page/${item.page}`}
                        {...item}
                    />
                )}
                boundaryCount={1}
                siblingCount={2}
                style={{marginTop: '20px', alignSelf: 'center'}}
            />
        </Container>
    );
};

export default AllEnglishTeachers;