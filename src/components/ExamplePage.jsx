import React from 'react';
import Words from './word/Words';

const ExamplePage = () => {
    const sampleText = "This is an example sentence with words that need translation.";

    return (
        <div>
            <h1>Example Page</h1>
            <p>Here is a sentence where you can hover over each word to see its translation:</p>
            {/*<Words text={sampleText} />*/}
        </div>
    );
};

export default ExamplePage;