import React, { useState } from 'react';
import { TextField, Typography } from "@mui/material";

const QuestionForm = ({ question, onUpdateQuestion }) => {
    const [questionText, setQuestionText] = useState(question.questionText);
    const [answer, setAnswer] = useState(question.answer || "");

    const handleQuestionChange = (event) => {
        setQuestionText(event.target.value);
        onUpdateQuestion({ ...question, questionText: event.target.value });
    };

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
        onUpdateQuestion({ ...question, answer: event.target.value });
    };

    return (
        <div className="root">
            <Typography variant="h6" gutterBottom>
                <TextField
                    className="input"
                    variant="outlined"
                    fullWidth
                    value={questionText}
                    onChange={handleQuestionChange}
                    placeholder="Enter your question"
                />
            </Typography>
            <TextField
                className="input"
                variant="outlined"
                fullWidth
                value={answer}
                onChange={handleAnswerChange}
                placeholder="Your answer"
                sx={{ margin: '10px 0px 10px 0px' }}
            />
        </div>
    );
};

export default QuestionForm;