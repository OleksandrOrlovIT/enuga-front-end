import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Question from "./Question";
import api from "../auth/api";
import {Button, Grid} from "@mui/material";
import Words from "../word/Words";
import {AuthContext} from "../auth/AuthContext";

function EnglishTest() {
    const {hasRole} = useContext(AuthContext);
    const { id } = useParams();

    const [test, setTest] = useState('');

    useEffect(() => {
        api.get(`/english-test/${id}`)
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
            {hasRole('ROLE_ENGLISH_TEACHER_USER') &&
                <Grid container justifyContent="right" style={{marginTop: '20px', marginRight: '400px'}}>
                    <Link to={`/english-tests/update/${test.id}`} style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="primary" sx={{fontSize: '1.0rem', padding: '10px 20px'}}>
                            <Words text="Edit english test"/>
                        </Button>
                    </Link>
                </Grid>
            }
        </div>
    );
}

export default EnglishTest;
