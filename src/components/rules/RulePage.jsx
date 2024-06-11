import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Grid, Typography} from "@mui/material";
import Words from "../word/Words";
import api from "../auth/api";

function RulePage() {
    const { id } = useParams();

    const [rule, setRule] = useState('');

    useEffect(() => {
        api.get(`/v1/rule/${id}`)
            .then(response => {
                console.log(response.data);
                setRule(response.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!rule) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container justifyContent="center" style={{ margin: '40px 20px' }}>
            <Grid item xs={12} sm={8} md={6}>
                <Typography variant="h3" align="center">
                    <Words text={rule.ruleName} />
                </Typography>
                <br />
                <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                    <Words text={rule.description} />
                </Typography>
            </Grid>
        </Grid>
    );
}

export default RulePage;