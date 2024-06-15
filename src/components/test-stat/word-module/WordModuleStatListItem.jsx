import {getGradientColor} from "../../common/GradientColor";
import {ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

const WordModuleStatListItem = ({ testAttempt: wordModuleAttempt }) => {
    const { wordModuleId, attemptDate, successPercentage } = wordModuleAttempt;

    const backgroundColor = getGradientColor(successPercentage);

    return (
        <ListItem key = {wordModuleAttempt.id} style={{ backgroundColor: backgroundColor, marginBottom: '10px' }}>
            <ListItemText
                primary={
                    <Link to={`/word-modules/${wordModuleId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Word Module ID: {wordModuleId}
                    </Link>
                }
                secondary={`Attempt Date: ${new Date(attemptDate).toLocaleString()}`}
            />
            <ListItemText primary={`Success Percentage: ${successPercentage}%`} />
        </ListItem>
    );
};

export default WordModuleStatListItem;