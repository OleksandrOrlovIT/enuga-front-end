import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Grid, Typography, TextField, Button, Paper, Box, MenuItem, CircularProgress} from '@mui/material';
import api from '../auth/api';

const BookForm = () => {
    const {id} = useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        bookGenre: '', // Initialize with an empty string
    });
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(!!id);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            api.get(`/book/${id}`)
                .then(response => {
                    setBook(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching book data:', error);
                    setIsLoading(false);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBook(prevBook => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!id) {
                const formData = new FormData();
                formData.append('book', new Blob([JSON.stringify(book)], { type: 'application/json' }));

                if (file) {
                    formData.append('file', file);
                }

                const response = await api.post('/book', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const newId = response.data.id;
                navigate(`/books/${newId}/page/1`);
            } else {
                await api.put(`/book/${id}`, JSON.stringify(book), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                navigate(`/books/${id}/page/1`);
            }
        } catch (error) {
            console.error(`Error ${id ? 'updating' : 'creating'} the book:`, error);
        }
    };

    if (isLoading) {
        return (
            <Grid container justifyContent="center">
                <CircularProgress/>
            </Grid>
        );
    }

    return (
        <Grid container justifyContent="center" style={{margin: '40px 20px'}}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <Typography variant="h3" align="center">
                        {id ? 'Edit Book' : 'Create Book'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} mt={2}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Author"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            select
                            label="Genre"
                            name="bookGenre"
                            value={book.bookGenre}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            error={book.bookGenre === null} // Add error prop if bookGenre is null
                            helperText={book.bookGenre === null ? 'Please select a genre' : ''}
                        >
                            {Object.values(BookGenre).map((bookGenre) => (
                                <MenuItem key={bookGenre} value={bookGenre}>
                                    {bookGenre}
                                </MenuItem>
                            ))}
                        </TextField>
                        <input
                            accept=".txt"
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            style={{display: 'none'}}
                        />
                        {!id && <>
                            <label htmlFor="file-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    style={{marginTop: '10px'}}
                                >
                                    Upload File
                                </Button>
                            </label>

                            <Typography variant="body2">
                                {file ? file.name : 'No file chosen'}
                            </Typography>
                        </>
                        }
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{marginTop: '20px'}}
                        >
                            {id ? 'Save Changes' : 'Create Book'}
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
        ;
};

export default BookForm;

const BookGenre = {
    FICTION: 'FICTION',
    NONFICTION: 'NONFICTION',
    POETRY: 'POETRY',
    DRAMA: 'DRAMA',
};