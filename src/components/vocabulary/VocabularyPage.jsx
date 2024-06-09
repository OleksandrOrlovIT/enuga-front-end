import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Container, PaginationItem } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import TranslationTable from './TranslationTable';
import Pagination from "@mui/material/Pagination";

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
        axios.post(`http://localhost:8080/v1/translation-pairs`, input)
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
            <TranslationTable data={words}/>
            <div>
                <Pagination
                    count={totalPages}
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