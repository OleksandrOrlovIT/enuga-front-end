import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Grid, Container } from '@mui/material';
import BookCard from "./BookCard";

function AllBookCards() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/v1/books`)
            .then(response => {
                setBooks(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    if (books.length === 0) {
        return <div>Loading...</div>;
    }


    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                {books.map(book => (
                    <Grid item key={book.id}>
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AllBookCards;