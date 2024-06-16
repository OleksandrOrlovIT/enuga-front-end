import React, { useEffect, useState } from 'react';
import { Container, PaginationItem, Button } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import TranslationTable from './TranslationTable';
import Pagination from "@mui/material/Pagination";
import api from "../auth/api";

function VocabularyPage() {
    const { page } = useParams();
    const [changedPage, setChangedPage] = useState(page);
    const [words, setWords] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 10;

    useEffect(() => {
        let input = {
            page: changedPage,
            size: 10
        };
        api.post(`/translation-pairs`, input)
            .then(response => {
                setWords(response.data);
                setTotalPages(Math.ceil(response.data.totalElements / pageSize));
            })
            .catch(err => console.log(err));
    }, [changedPage]);

    if (words.length === 0) {
        return <div>Loading...</div>;
    }

    const handleChangePage = (event, newPage) => {
        setChangedPage(newPage);
    };

    return (
        <Container>
            <Button
                variant="contained"
                component={Link}
                to="/vocabulary/create-translation"
                style={{ marginLeft: '950px', marginBottom: '20px', marginTop: '20px' }}
            >
                Create Translation
            </Button>
            <TranslationTable data={words} />
            <div>
                <Pagination
                    count={totalPages - 1}
                    page={parseInt(page)}
                    onChange={handleChangePage}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            onClick={handleChangePage}
                            to={`/vocabulary/${item.page}`}
                            style={{ textDecoration: 'none' }}
                            {...item}
                        />
                    )}
                    boundaryCount={1}
                    siblingCount={2}
                />
            </div>
        </Container>
    );
}

export default VocabularyPage;