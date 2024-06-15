import {Link, useNavigate} from "react-router-dom";
import React, { useEffect, useState} from "react";
import api from "../auth/api";
import {
    Box,
    CircularProgress,
    Container, Pagination, PaginationItem,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

const AllEnglishStudentsPage = ({pageNumber, englishTeacher}) => {
    const [englishStudents, setEnglishStudents] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchEnglishStudents = async (page) => {
            try {
                setLoading(true);
                if (!englishTeacher.id) return;
                const response = await api.post('/english-student/by-teacher', {
                    englishTeacherId: englishTeacher.id,
                    pageNumber: page - 1,
                    pageSize: 10
                });
                setEnglishStudents(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching englishStudents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnglishStudents(Number(pageNumber) || 1);
    }, [pageNumber, englishTeacher.id]);

    const handlePageChange = (event, value) => {
        navigate(`/all-english-students/page/${value}`);
    };

    return (
        <Container maxWidth="lg">
            <Box mt={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    All Users
                </Typography>
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <Paper elevation={3}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {englishStudents.map((englishStudent) => (
                                        <TableRow key={englishStudent.user.id}>
                                            <TableCell>{englishStudent.user.id}</TableCell>
                                            <TableCell>{englishStudent.user.email}</TableCell>
                                            <TableCell>{englishStudent.user.firstName}</TableCell>
                                            <TableCell>{englishStudent.user.lastName}</TableCell>
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
                            to={`/all-english-students/page/${item.page}`}
                            {...item}
                        />
                    )}
                    boundaryCount={1}
                    siblingCount={2}
                    style={{marginTop: '20px', alignSelf: 'center'}}
                />
            </Box>
        </Container>
    );
};

export default AllEnglishStudentsPage;