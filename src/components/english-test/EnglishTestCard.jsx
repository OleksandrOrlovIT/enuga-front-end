import React from 'react';
import CustomCard from "../common/CustomCard";

function EnglishTestCard({ englishTest }) {
    return<CustomCard heading={englishTest.testName} linkToGet={`/english-tests/${englishTest.id}`}/>
}

export default EnglishTestCard;