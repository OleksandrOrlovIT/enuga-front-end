import React, {useEffect, useState} from 'react';
import api from "../auth/api";
import GradientCard from "../common/GradientCard";

function EnglishTestCard({ englishTest, userId, onDelete }) {
    const [bestPercentage, setBestPercentage] = useState(0);
    const [lastTryPercentage, setLastTryPercentage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = {"userId": userId, "englishTestId": englishTest.id};

                const bestResponse = await api.post('/test-attempts/user/stats-best', request);

                const formattedBestTryPercentage = bestResponse.data.successPercentage ?
                    bestResponse.data.successPercentage.toFixed(2) : 0;

                setBestPercentage(formattedBestTryPercentage);

                const lastResponse = await api.post('/test-attempts/user/stats-last', request);

                const formattedLastTryPercentage = lastResponse.data.successPercentage ?
                    lastResponse.data.successPercentage.toFixed(2) : 0;

                setLastTryPercentage(formattedLastTryPercentage);
            } catch (error) {
                console.error('Error fetching best and last test attempts:', error);
            }
        };

        fetchData();
    }, [userId, englishTest.id]);

    const deleteCard = () => {
        api.delete(`/english-test/${englishTest.id}`)
            .then(() => {
                console.log(`Successfully deleted englishTest with ${englishTest.id}`);
                onDelete(englishTest.id);
            })
            .catch(err => {
                console.log(`Error deleting englishTest with ${englishTest.id}`, err);
            });
    };

    return (
        <GradientCard
            heading={englishTest.testName}
            linkToGet={`/english-tests/${englishTest.id}`}
            deleteFunc={deleteCard}
            successPercentage={bestPercentage}
            lastTryPercentage={lastTryPercentage}
            bestPercentage={bestPercentage}
        />
    );
}

export default EnglishTestCard;