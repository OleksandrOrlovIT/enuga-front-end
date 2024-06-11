import React, { useEffect, useState } from 'react';
import RuleCard from "./RuleCard";
import { Grid, Container } from '@mui/material';
import api from "../auth/api";

function RulePage() {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        api.get(`/v1/rules`)
            .then(response => {
                setRules(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    if (rules.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                {rules.map((rule) => (
                    <Grid item key={rule.id}>
                        <RuleCard rule={rule} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default RulePage;