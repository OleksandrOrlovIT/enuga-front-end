import React from 'react';
import CustomCard from "../common/CustomCard";
import api from "../auth/api";

function EnglishTestCard({ englishTest, onDelete }) {
    const deleteCard = () => {
        api.delete(`/english-test/${englishTest.id}`)
            .then(() => {
                console.log(`Successfully deleted englishTest with ${englishTest.id}`);
                onDelete(englishTest.id);
            })
            .catch(err => {
                console.log(`Error deleting englishTest with ${englishTest.id}`, err);
            });
    }

    return<CustomCard heading={englishTest.testName} linkToGet={`/english-tests/${englishTest.id}`}
                      deleteFunc={deleteCard}/>
}

export default EnglishTestCard;