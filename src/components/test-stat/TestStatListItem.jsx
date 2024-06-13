import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from '@mui/material';
import {getGradientColor} from "../common/GradientColor";

const TestStatListItem = ({ testAttempt }) => {
    const { englishTestId, attemptDate, successPercentage } = testAttempt;

    const backgroundColor = getGradientColor(successPercentage);

    return (
        <ListItem key = {testAttempt.id} style={{ backgroundColor: backgroundColor, marginBottom: '10px' }}>
            <ListItemText
                primary={
                    <Link to={`/english-tests/${englishTestId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Test ID: {englishTestId}
                    </Link>
                }
                secondary={`Attempt Date: ${new Date(attemptDate).toLocaleString()}`}
            />
            <ListItemText primary={`Success Percentage: ${successPercentage}%`} />
        </ListItem>
    );
};

export default TestStatListItem;