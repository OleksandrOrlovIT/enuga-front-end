import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import api from "../auth/api";
import QuestionForm from "./QuestionForm";

function EnglishTestForm() {
    const { id } = useParams();
    const [test, setTest] = useState({ testName: '', questions: [] });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            api.get(`/english-test/${id}`)
                .then(response => {
                    setTest(response.data);
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTest(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddQuestion = () => {
        setTest(prevState => ({
            ...prevState,
            questions: [...prevState.questions, { questionText: '', answer: '' }]
        }));
    };

    const handleDeleteQuestion = (index) => {
        setTest(prevState => ({
            ...prevState,
            questions: prevState.questions.filter((_, i) => i !== index)
        }));
    };

    const handleQuestionChange = (index, updatedQuestion) => {
        setTest((prevTest) => {
            const updatedQuestions = [...prevTest.questions];
            updatedQuestions[index] = updatedQuestion;
            return { ...prevTest, questions: updatedQuestions };
        });
    };

    const handleSubmit = () => {
        if (id) {
            api.put(`/english-test/${id}`, test)
                .then(response => {
                    navigate(`/english-tests/${id}`);
                })
                .catch(err => console.log(err));
        } else {
            api.post('/english-test', test)
                .then(response => {
                    navigate(`/english-tests/${response.data.id}`);
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                English Test Form
            </Typography>
            <TextField
                name="testName"
                label="Test Name"
                variant="outlined"
                fullWidth
                value={test.testName}
                onChange={handleChange}
                style={{ marginBottom: '20px' }}
            />
            <Typography variant="h6" gutterBottom>
                Questions
            </Typography>
            {test.questions.map((question, index) => (
                <div key={index}>
                    <QuestionForm question={question} onUpdateQuestion={(updatedQuestion) => handleQuestionChange(index, updatedQuestion)} />
                    <Button variant="contained" color="secondary"
                            onClick={() => handleDeleteQuestion(index)} sx={{ margin: '0px 0px 30px 0' }}>
                        Delete Question
                    </Button>
                </div>
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddQuestion}
                sx={{ margin: '50px 10px 10px 0' }}
            >
                Add Question
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ margin: '50px 0 10px 0' }}
            >
                {id ? 'Update Test' : 'Create Test'}
            </Button>
        </div>
    );
}

export default EnglishTestForm;