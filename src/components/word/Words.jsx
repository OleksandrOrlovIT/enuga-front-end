import React from 'react';
import Word from "./Word";

function createWordElem(input, index){
    const cleanedWord = input.replace(/[^a-zA-Z]/g, '');

    return (
        <React.Fragment key={index}>
            <Word word={cleanedWord} />
            {' '}
        </React.Fragment>
    );
}

function Words({ text }){
    const words = text.split(" ");

    return (
        <div>
            {words.map(createWordElem)}
        </div>
    );
}

export default Words;