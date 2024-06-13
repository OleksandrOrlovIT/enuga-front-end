import React, {useContext, useEffect, useState} from 'react';
import {Container, Typography, Box, Pagination, PaginationItem, Grid, Button} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Words from "../word/Words";
import api from "../auth/api";
import {AuthContext} from "../auth/AuthContext";

const ReadBookPage = () => {
    const {hasRole} = useContext(AuthContext);
    const { id, pageNumber } = useParams();
    const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
    const [pageData, setPageData] = useState({});

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        api.get(`/book/${id}/page/${currentPage}`)
            .then(response => {
                setPageData(response.data);
            })
            .catch(err => console.log(err));
    }, [currentPage, id]);


    return (
        <Container>
            {pageData && Object.keys(pageData).length > 0 && (
                <>
                    <Typography variant="h4" gutterBottom>
                        {pageData.bookResponse.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        By {pageData.bookResponse.author} - Genre: {pageData.bookResponse.bookGenre}
                    </Typography>
                    <Box
                        sx={{
                            border: '1px solid #ccc',
                            padding: '16px',
                            margin: '24px 0',
                            minHeight: '400px',
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        <Typography variant="body1" component="pre" sx={{ fontSize: '1.1rem' }}>
                            <Words text={pageData.content}/>
                        </Typography>
                    </Box>
                    <Pagination
                        count={pageData.bookResponse.pagesCount}
                        page={currentPage}
                        onChange={handleChangePage}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`#`}
                                {...item}
                            />
                        )}
                        boundaryCount={1}
                        siblingCount={2}
                    />
                    {hasRole('ROLE_ENGLISH_TEACHER_USER') &&
                        <Grid container justifyContent="right" style={{marginTop: '20px', marginRight: '400px'}}>
                            <Link to={`/books/update/${pageData.bookResponse.id}`} style={{textDecoration: 'none'}}>
                                <Button variant="contained" color="primary" sx={{fontSize: '1.0rem', padding: '10px 20px'}}>
                                    <Words text="Edit book"/>
                                </Button>
                            </Link>
                        </Grid>
                    }
                </>
            )}
        </Container>
    );
};

export default ReadBookPage;