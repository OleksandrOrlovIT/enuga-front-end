import React, { useState, useEffect } from 'react';
import api from "../auth/api";

function Word({ word }) {
    const [translation, setTranslation] = useState('');

    useEffect(() => {
        if (word && word.trim() !== '' && /^[a-zA-Z]+$/.test(word)) {
            const tempData = { word: word };
            api.post("/translation-pair/translate/eng-to-ukr-word", tempData)
                .then(response => {
                    setTranslation(response.data);
                })
                .catch(err => console.log(err));
        }
    }, [word]);

    return (
        <span title={translation.length > 0 ? translation[0].word : ""}>{word}</span>
    );
}

export default Word;