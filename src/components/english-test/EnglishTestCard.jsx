import React from 'react';
import CustomCard from "../common/CustomCard";

function EnglishTestCard({ englishTest }) {
    return<CustomCard heading={englishTest.testName} linkTo={`/english-tests/${englishTest.id}`}/>
}

export default EnglishTestCard;