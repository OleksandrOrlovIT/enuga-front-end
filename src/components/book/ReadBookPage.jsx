import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Pagination, PaginationItem } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import Words from "../word/Words";

const ReadBookPage = () => {
    const { id, pageNumber } = useParams();
    const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
    const [pageData, setPageData] = useState({});

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/v1/book/${id}/page/${currentPage}`)
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
                </>
            )}
        </Container>
    );
};

export default ReadBookPage;