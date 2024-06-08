import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Question from "./Question";

function EnglishTest() {
    const { id } = useParams();

    const [test, setTest] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/v1/english-test/${id}`)
            .then(response => {
                console.log(response.data);
                setTest(response.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!test) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{test.testName}</h1>
            {
                test.questions.map((question, index) => (
                    <React.Fragment key={index}>
                        <Question question={question}/>
                    </React.Fragment>
                ))
            }
        </div>
    );
}

export default EnglishTest;
