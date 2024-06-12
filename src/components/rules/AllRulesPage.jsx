import React, {useContext, useEffect, useState} from 'react';
import RuleCard from "./RuleCard";
import {Grid, Container, Button} from '@mui/material';
import api from "../auth/api";
import {Link} from "react-router-dom";
import Words from "../word/Words";
import {AuthContext} from "../auth/AuthContext";

function AllRulesPage() {
    const {hasRole} = useContext(AuthContext);
    const [rules, setRules] = useState([]);

    useEffect(() => {
        api.get(`/rules`)
            .then(response => {
                setRules(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const deleteRule = (ruleId) => {
        setRules(rules.filter(rule => rule.id !== ruleId));
    };

    if (rules.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                {rules.map((rule) => (
                    <Grid item key={rule.id}>
                        <RuleCard rule={rule} onDelete={deleteRule}/>
                    </Grid>
                ))}
            </Grid>
            {hasRole('ROLE_ENGLISH_TEACHER_USER') &&
                <Grid container justifyContent="right" style={{marginTop: '20px', marginRight: '400px'}}>
                    <Link to={`/rules/create`} style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="primary" sx={{fontSize: '1.0rem', padding: '10px 20px'}}>
                            <Words text="Create rule"/>
                        </Button>
                    </Link>
                </Grid>
            }
        </Container>
    );
}

export default AllRulesPage;