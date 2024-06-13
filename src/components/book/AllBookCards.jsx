import React, {useContext, useEffect, useState} from 'react';
import {Grid, Container, Button} from '@mui/material';
import BookCard from "./BookCard";
import api from "../auth/api";
import {Link} from "react-router-dom";
import Words from "../word/Words";
import {AuthContext} from "../auth/AuthContext";

function AllBookCards() {
    const {hasRole} = useContext(AuthContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        api.get("/books")
            .then(response => {
                setBooks(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const deleteBook = (bookId) => {
        api.delete(`/book/${bookId}`)
            .then(() => {
                console.log(`Successfully deleted book with ID ${bookId}`);
                setBooks(books.filter(book => book.id !== bookId)); // Update state after deletion
            })
            .catch(err => {
                console.log(`Error deleting book with ID ${bookId}`, err);
            });
    };

    if (books.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                {books.map(book => (
                    <Grid item key={book.id}>
                        <BookCard book={book} onDelete={deleteBook} /> {/* Pass deleteBook function to BookCard */}
                    </Grid>
                ))}
            </Grid>
            {hasRole('ROLE_ENGLISH_TEACHER_USER') &&
                <Grid container justifyContent="right" style={{marginTop: '20px', marginRight: '400px'}}>
                    <Link to={`/books/create`} style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="primary" sx={{fontSize: '1.0rem', padding: '10px 20px'}}>
                            <Words text="Create book"/>
                        </Button>
                    </Link>
                </Grid>
            }
        </Container>
    );
}

export default AllBookCards;