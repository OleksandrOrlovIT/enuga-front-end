import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Grid, Container } from '@mui/material';
import EnglishTestCard from "./EnglishTestCard";

function AllEnglishTests() {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/v1/english-tests`)
            .then(response => {
                setTests(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    if (tests.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                {tests.map((test) => (
                    <Grid item key={test.id}>
                        <EnglishTestCard englishTest={test} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AllEnglishTests;