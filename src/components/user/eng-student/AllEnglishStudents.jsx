import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import api from "../../auth/api";
import {
    Box,
    Button,
    CircularProgress,
    Container, Pagination, PaginationItem,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    Typography
} from "@mui/material";

const AllEnglishStudents = () => {
    const {pageNumber} = useParams();
    const [englishStudents, setEnglishStudents] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnglishTeachers = async (page) => {
            setLoading(true);
            try {
                const response = await api.post('/english-students/page', {
                    pageNumber: page - 1,
                    pageSize: 10
                });
                setEnglishStudents(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching englishStudents:', error);
            }
            setLoading(false);
        };

        fetchEnglishTeachers(Number(pageNumber) || 1);
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        navigate(`/admin/all-english-students/page/${value}`);
    };

    const handleEdit = (englishStudent) => {
        navigate(`/admin/edit-english-student/${englishStudent.id}`);
    };

    const handleDelete = async (englishStudentId) => {
        try {
            await api.delete(`/english-student/${englishStudentId}`);
            setEnglishStudents(englishStudents.filter(user => user.id !== englishStudentId));
        } catch (error) {
            console.error('Error deleting english teacher:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    All English Students
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/admin/create-english-student')}
                >
                    Create New English Student
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
                                    <TableCell>English Student ID</TableCell>
                                    <TableCell>User ID</TableCell>
                                    <TableCell>English Teacher ID</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {englishStudents.map((englishStudent) => (
                                    <TableRow key={englishStudent.id}>
                                        <TableCell>{englishStudent.id}</TableCell>
                                        <TableCell>{englishStudent.user.id}</TableCell>
                                        <TableCell>{englishStudent.englishTeacherId}</TableCell>
                                        <TableCell>{englishStudent.user.email}</TableCell>
                                        <TableCell>{englishStudent.user.firstName}</TableCell>
                                        <TableCell>{englishStudent.user.lastName}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleEdit(englishStudent)}
                                                style={{marginRight: '8px'}}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDelete(englishStudent.id)}
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
                        to={`/admin/all-english-students/page/${item.page}`}
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

export default AllEnglishStudents;