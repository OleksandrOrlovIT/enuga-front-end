import React, {useState} from "react";
import {TextField, Typography} from "@mui/material";

const CustomPairForm = ({ customPair, onUpdateCustomPair }) => {
    const [word, setWord] = useState(customPair.word || "");
    const [translation, setTranslation] = useState(customPair.translation || "");

    const handleWordChange = (event) => {
        const newWord = event.target.value;
        setWord(newWord);
        onUpdateCustomPair({ ...customPair, word: newWord });
    };

    const handleTranslationChange = (event) => {
        const newTranslation = event.target.value;
        setTranslation(newTranslation);
        onUpdateCustomPair({ ...customPair, translation: newTranslation });
    };

    return (
        <div className="root">
            <Typography variant="h6" gutterBottom>
                <TextField
                    className="input"
                    variant="outlined"
                    fullWidth
                    value={word}
                    onChange={handleWordChange}
                    placeholder="Enter your word"
                />
            </Typography>
            <TextField
                className="input"
                variant="outlined"
                fullWidth
                value={translation}
                onChange={handleTranslationChange}
                placeholder="Your translation"
                sx={{ margin: '10px 0px 10px 0px' }}
            />
        </div>
    );
};

export default CustomPairForm;