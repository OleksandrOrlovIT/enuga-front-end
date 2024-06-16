import React, {useEffect, useState} from 'react';
import api from "../auth/api";
import GradientCard from "../common/GradientCard";

function EnglishTestCard({ wordModule, userId, onDelete }) {
    const [bestPercentage, setBestPercentage] = useState(0);
    const [lastTryPercentage, setLastTryPercentage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = {"userId": userId, "englishTestId": wordModule.id};

                const bestResponse = await api.post('/test-attempts/user/stats-best', request);

                const formattedBestTryPercentage = bestResponse.data.successPercentage ?
                    bestResponse.data.successPercentage.toFixed(2) : 0;

                setBestPercentage(formattedBestTryPercentage);

                const lastResponse = await api.post('/test-attempts/user/stats-last', request);

                const formattedLastTryPercentage = lastResponse.data.successPercentage ?
                    lastResponse.data.successPercentage.toFixed(2) : formattedBestTryPercentage;

                setLastTryPercentage(formattedLastTryPercentage);
            } catch (error) {
                console.error('Error fetching best and last test attempts:', error);
            }
        };

        fetchData();
    }, [userId, wordModule.id]);

    const deleteCard = () => {
        api.delete(`/english-test/${wordModule.id}`)
            .then(() => {
                console.log(`Successfully deleted englishTest with ${wordModule.id}`);
                onDelete(wordModule.id);
            })
            .catch(err => {
                console.log(`Error deleting englishTest with ${wordModule.id}`, err);
            });
    };

    return (
        <GradientCard
            heading={wordModule.testName}
            linkToGet={`/english-tests/${wordModule.id}`}
            deleteFunc={deleteCard}
            lastTryPercentage={lastTryPercentage}
            bestPercentage={bestPercentage}
        />
    );
}

export default EnglishTestCard;