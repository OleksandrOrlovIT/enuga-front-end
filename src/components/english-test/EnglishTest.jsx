import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Question from "./Question";
import api from "../auth/api";
import {Button, Grid} from "@mui/material";
import Words from "../word/Words";
import {AuthContext} from "../auth/AuthContext";

function EnglishTest() {
    const { hasRole, user } = useContext(AuthContext);
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [wrongAnswers, setWrongAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        api.get(`/english-test/${id}`)
            .then(response => {
                setTest(response.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleSubmit = () => {
        const testAttemptRequest = {
            userId: user.id,
            englishTestId: id,
            answers: answers
        };

        api.post('/english-test/take', testAttemptRequest)
            .then(response => {
                setWrongAnswers(response.data.wrongAnswers);
                setSubmitted(true);
            })
            .catch(err => {
                console.error('Error submitting test:', err);
            });
    };

    if (!test) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{test.testName}</h1>
            {
                test.questions.map((question, index) => (
                    <React.Fragment key={index}>
                        <Question
                            question={question}
                            onAnswerChange={handleAnswerChange}
                            submitted={submitted}
                            isWrong={wrongAnswers.hasOwnProperty(question.id)}
                        />
                    </React.Fragment>
                ))
            }
            <Grid container justifyContent="left" style={{ marginTop: '20px', marginRight: '400px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: '1.0rem', padding: '10px 20px' }}
                    onClick={handleSubmit}
                >
                    <Words text="Submit english test" />
                </Button>
            </Grid>
            {hasRole('ROLE_ENGLISH_TEACHER_USER') &&
                <Grid container justifyContent="right" style={{ marginTop: '20px', marginRight: '400px' }}>
                    <Link to={`/english-tests/update/${test.id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" sx={{ fontSize: '1.0rem', padding: '10px 20px' }}>
                            <Words text="Edit english test" />
                        </Button>
                    </Link>
                </Grid>
            }
        </div>
    );
}

export default EnglishTest;