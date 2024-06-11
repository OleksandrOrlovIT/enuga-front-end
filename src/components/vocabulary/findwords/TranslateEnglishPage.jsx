import React from 'react';
import TranslationPage from "./TranslationPage";

const TranslateEnglishPage = () => {
    return <TranslationPage linkUrl={"/v1/translation-pair/translate/eng-to-ukr-word"} />;
};

export default TranslateEnglishPage;