import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const TranslationPage = ({ linkUrl }) => {
    const [inputText, setInputText] = useState('');
    const [translatedWords, setTranslatedWords] = useState([]);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleTranslate = async () => {
        try {
            console.log("InputText", inputText);
            const response = await axios.post(
                linkUrl,
                { word: inputText }
            );
            console.log("Response data:", response.data);
            setTranslatedWords(response.data);
        } catch (error) {
            console.error('Error fetching translations:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <TextField
                label="Enter text to translate"
                variant="outlined"
                fullWidth
                value={inputText}
                onChange={handleInputChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleTranslate}
                style={{ marginTop: '20px' }}
            >
                Translate
            </Button>
            <List style={{ marginTop: '20px' }}>
                {translatedWords.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item.word} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TranslationPage;