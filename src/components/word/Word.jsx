import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Word({ word }) {
    const [translation, setTranslation] = useState('');

    useEffect(() => {
        const tempData = { word: word };
        axios.post(
            'http://localhost:8080/v1/translation-pair/translate/eng-to-ukr-word',
            tempData
        )
            .then(response => {
                setTranslation(response.data);
            })
            .catch(err => console.log(err));
    }, [word]);

    return (
        <span title={translation.length > 0 ? translation[0].word : ""}>{word}</span>
    );
}

export default Word;