import React from 'react';
import { TextField, Typography } from "@mui/material";
import Words from "../word/Words";

const Question = ({ question, onAnswerChange, submitted, isWrong }) => {

    const handleChange = (event) => {
        onAnswerChange(question.id, event.target.value);
    };

    const getBorderColor = () => {
        if (!submitted) return '';
        return isWrong ? '#ffcccb' : '#d4edda';
    };

    const getBackgroundColor = () => {
        if (!submitted) return 'white';
        return isWrong ? '#fff5f5' : '#f5fff5';
    };

    const getAnswerText = () => {
        if (!submitted) return '';
        return isWrong ? 'Wrong Answer' : 'Correct Answer';
    };

    const getAnswerTextColor = () => {
        if (!submitted) return '';
        return isWrong ? 'red' : 'green';
    };

    return (
        <div className="root" style={{ backgroundColor: 'white', padding: '10px', marginBottom: '10px' }}>
            <Typography variant="h6" gutterBottom>
                <Words text={question.questionText} />{' '}
                {submitted && (
                    <span style={{ color: getAnswerTextColor() }}>
                        ({getAnswerText()})
                    </span>
                )}
            </Typography>
            <TextField
                className="input"
                variant="outlined"
                fullWidth
                placeholder="Your answer"
                onChange={handleChange}
                disabled={submitted && !isWrong}
                InputProps={{
                    style: {
                        borderColor: getBorderColor(),
                        backgroundColor: getBackgroundColor(),
                    }
                }}
            />
        </div>
    );
};

export default Question;