import React from 'react';
import Word from "./Word";

function createWordElem(input){
    return (
        <>
            <Word key={input} word={input} />
            {' '}
        </>
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