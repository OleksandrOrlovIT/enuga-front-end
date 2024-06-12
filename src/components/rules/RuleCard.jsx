import React from 'react';
import CustomCard from "../common/CustomCard";
import api from "../auth/api";

function RuleCard({ rule, onDelete }) {
    const deleteCard = () => {
        api.delete(`/rule/${rule.id}`)
            .then(() => {
                console.log(`Successfully deleted rule with ${rule.id}`);
                onDelete(rule.id);
            })
            .catch(err => {
                console.log(`Error deleting rule with ${rule.id}`, err);
            });
    }

    return (
        <CustomCard heading={rule.ruleName} linkToGet={`/rules/${rule.id}`} deleteFunc={deleteCard}/>
    );
}

export default RuleCard;