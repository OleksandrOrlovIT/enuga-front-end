import React, {useState} from 'react';
import {Button, Paper, TextField} from "@mui/material";
import api from "../auth/api";
import {useNavigate} from "react-router-dom";

const CreateTranslation = () => {
    const [ukrainianWord, setUkrainianWord] = useState('');
    const [englishWord, setEnglishWord] = useState('');
    const navigate = useNavigate();

    const handleUkrainianChange = (event) => {
        setUkrainianWord(event.target.value);
    };

    const handleEnglishChange = (event) => {
        setEnglishWord(event.target.value);
    };

    const handleSubmit = async () => {
        if (ukrainianWord && englishWord) {
            try {
                const response = await api.post('/translation-pair', {
                    ukrainianWord: ukrainianWord,
                    englishWord: englishWord,
                });
                console.log('Translation created:', response.data);
                navigate("/vocabulary/1");
            } catch (error) {
                console.error('Error creating translation:', error);
            }
        }
    };

    return (
        <Paper sx={{
            width: '80%',
            margin: 'auto',
            padding: 2,
            marginTop: 4,
        }}>
            <form noValidate autoComplete="off">
                <TextField
                    id="ukrainian-word"
                    label="Ukrainian Word"
                    value={ukrainianWord}
                    onChange={handleUkrainianChange}
                    fullWidth
                    sx={{marginBottom: 2}}
                />
                <TextField
                    id="english-word"
                    label="English Word"
                    value={englishWord}
                    onChange={handleEnglishChange}
                    fullWidth
                    sx={{marginBottom: 2}}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{marginTop: 2, float: 'right'}}
                >
                    Submit
                </Button>
            </form>
        </Paper>
    );
};

export default CreateTranslation;
