import React from 'react';
import Word from "./Word";

function createWordElem(input, index) {
    const cleanedWord = input.replace(/[^a-zA-Z]/g, '');

    return (
        <React.Fragment key={index}>
            {/[a-zA-Z]/.test(input) ? <Word word={cleanedWord} /> : input}
        </React.Fragment>
    );
}

function Words({ text }) {
    const wordsAndPunctuation = text ? text.split(/(\s+|[^a-zA-Z]+)/).filter(Boolean) : text;

    return (
        <div>
            { wordsAndPunctuation ? wordsAndPunctuation.map((word, index) => createWordElem(word, index)) : wordsAndPunctuation}
        </div>
    );
}

export default Words;
