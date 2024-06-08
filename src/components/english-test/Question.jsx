import React from 'react';
import { TextField, Typography } from "@mui/material";
import Words from "../word/Words";

const Question = ({ question }) => {
    return (
        <div className="root">
            <Typography variant="h6" gutterBottom>
                <Words text={question.questionText}/>
            </Typography>
            <TextField
                className="input"
                variant="outlined"
                fullWidth
                placeholder="Your answer"
            />
        </div>
    );
};

export default Question;