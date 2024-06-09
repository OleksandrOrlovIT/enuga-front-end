import React from 'react';
import CustomCard from "../common/CustomCard";

function RuleCard({ rule }) {
    return (
        <CustomCard heading={rule.ruleName} linkTo={`/rules/${rule.id}`}/>
    );
}

export default RuleCard;