import {TextField, Typography} from "@mui/material";
import Words from "../word/Words";
import React from "react";

const CustomPair = ({ customPair, translation, onTranslationChange, submitted, isWrong }) => {

    const handleChange = (event) => {
        onTranslationChange(customPair.id, event.target.value);
    };

    const getBorderColor = () => {
        if (!submitted) return '';
        return isWrong ? '#ffcccb' : '#d4edda';
    };

    const getBackgroundColor = () => {
        if (!submitted) return 'white';
        return isWrong ? '#fff5f5' : '#f5fff5';
    };

    const getTranslationText = () => {
        if (!submitted) return '';
        return isWrong ? 'Wrong Answer' : 'Correct Answer';
    };

    const getTranslationTextColor = () => {
        if (!submitted) return '';
        return isWrong ? 'red' : 'green';
    };

    const getDisplayedTranslation = () => {
        if (!submitted) return '';
        return isWrong ? customPair.translation : translation[customPair.id] || '';
    };

    return (
        <div className="root" style={{ backgroundColor: 'white', padding: '10px', marginBottom: '10px' }}>
            <Typography variant="h6" gutterBottom>
                <Words text={customPair.word} />{' '}
                {submitted && (
                    <span style={{ color: getTranslationTextColor() }}>
                        ({getTranslationText()})
                    </span>
                )}
            </Typography>
            <TextField
                className="input"
                variant="outlined"
                fullWidth
                placeholder="Your translation"
                onChange={handleChange}
                disabled={submitted && !isWrong}
                value={submitted ? getDisplayedTranslation() : translation[customPair.id] || ''}
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

export default CustomPair;