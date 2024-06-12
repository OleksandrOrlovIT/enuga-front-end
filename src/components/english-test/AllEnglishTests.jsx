import React, {useContext, useEffect, useState} from 'react';
import {Grid, Container, Button} from '@mui/material';
import EnglishTestCard from "./EnglishTestCard";
import api from "../auth/api";
import {AuthContext} from "../auth/AuthContext";
import {Link} from "react-router-dom";
import Words from "../word/Words";

function AllEnglishTests() {
    const [tests, setTests] = useState([]);
    const {hasRole} = useContext(AuthContext);

    useEffect(() => {
        api.get(`/english-tests`)
            .then(response => {
                setTests(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    if (tests.length === 0) {
        return <div>Loading...</div>;
    }

    const deleteEnglishTest = (englishTestId) => {
        setTests(tests.filter(englishTest => englishTest.id !== englishTestId));
    };

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                {tests.map((test) => (
                    <Grid item key={test.id}>
                        <EnglishTestCard englishTest={test} onDelete={deleteEnglishTest}/>
                    </Grid>
                ))}
            </Grid>
            {hasRole('ROLE_ENGLISH_TEACHER_USER') &&
                <Grid container justifyContent="right" style={{marginTop: '20px', marginRight: '400px'}}>
                    <Link to={`/english-tests/create`} style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="primary" sx={{fontSize: '1.0rem', padding: '10px 20px'}}>
                            <Words text="Create Test"/>
                        </Button>
                    </Link>
                </Grid>
            }
        </Container>
    );
}

export default AllEnglishTests;