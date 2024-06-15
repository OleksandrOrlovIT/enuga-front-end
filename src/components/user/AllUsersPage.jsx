import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import api from "../auth/api";

const AllUsersPage = () => {
    const { pageNumber } = useParams();
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async (page) => {
            setLoading(true);
            try {
                const response = await api.post('/users/page', {
                    pageNumber: page - 1,
                    pageSize: 10
                });
                setUsers(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            setLoading(false);
        };

        fetchUsers(Number(pageNumber) || 1);
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        navigate(`/all-users/page/${value}`);
    };

    const handleEdit = (user) => {
        navigate(`/edit-user/${user.id}`);
    };

    const handleDelete = async (userId) => {
        try {
            await api.delete(`/user/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box mt={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    All Users
                </Typography>
                {loading ? (
                    <CircularProgress />
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
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleEdit(user)}
                                                    style={{ marginRight: '8px' }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleDelete(user.id)}
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
                            to={`/all-users/page/${item.page}`}
                            {...item}
                        />
                    )}
                    boundaryCount={1}
                    siblingCount={2}
                    style={{ marginTop: '20px', alignSelf: 'center' }}
                />
            </Box>
        </Container>
    );
};

export default AllUsersPage;