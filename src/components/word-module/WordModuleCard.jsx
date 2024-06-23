import React, { useEffect, useState} from "react";
import api from "../auth/api";
import GradientCard from "../common/GradientCard";

function EnglishTestCard({ wordModule, userId, onDelete }) {
    const [bestPercentage, setBestPercentage] = useState(0);
    const [lastTryPercentage, setLastTryPercentage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = { userId: userId, wordModuleId: wordModule.id };

                const bestResponse = await api.post('/word-module-attempts/user/stats-best', request);
                console.log("BestResponse: ", bestResponse.data.successPercentage);

                const formattedBestTryPercentage = bestResponse.data.successPercentage !== undefined
                    ? bestResponse.data.successPercentage.toFixed(2)
                    : 0;

                setBestPercentage(formattedBestTryPercentage);

                const lastResponse = await api.post('/word-module-attempts/user/stats-last', request);

                if (lastResponse.data.successPercentage !== undefined && lastResponse.data.successPercentage !== null) {
                    const formattedLastTryPercentage = lastResponse.data.successPercentage.toFixed(2);
                    setLastTryPercentage(formattedLastTryPercentage);
                } else {
                    setLastTryPercentage(0);
                }

            } catch (error) {
                console.error('Error fetching best and last word module attempts:', error);
            }
        };

        fetchData();
    }, [userId, wordModule.id]);

    const deleteCard = () => {
        api.delete(`/word-module/${wordModule.id}`)
            .then(() => {
                console.log(`Successfully deleted word module with ${wordModule.id}`);
                onDelete(wordModule.id);
            })
            .catch(err => {
                console.log(`Error deleting word module with ${wordModule.id}`, err);
            });
    };

    return (
        <GradientCard
            heading={wordModule.moduleName}
            linkToGet={`/word-modules/${wordModule.id}`}
            deleteFunc={deleteCard}
            bestPercentage={bestPercentage}
            lastTryPercentage={lastTryPercentage}
        />
    );
}

export default EnglishTestCard;