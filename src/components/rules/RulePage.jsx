import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Button, Grid, Typography} from '@mui/material';
import Words from '../word/Words';
import api from '../auth/api';
import {AuthContext} from "../auth/AuthContext";

function RulePage() {
    const {hasRole} = useContext(AuthContext);
    const {id} = useParams();

    const [rule, setRule] = useState(null);

    useEffect(() => {
        api.get(`/rule/${id}`)
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
        <Grid container justifyContent="center" style={{margin: '40px 20px'}}>
            <Grid item xs={12} sm={8} md={6}>
                <Typography variant="h3" align="center">
                    <Words text={rule.ruleName}/>
                </Typography>
                <br/>
                <Typography variant="body1" style={{fontSize: '1.2rem'}}>
                    <Words text={rule.description}/>
                </Typography>
            </Grid>
            {hasRole('ROLE_ENGLISH_TEACHER_USER') &&
                <Grid container justifyContent="right" style={{marginTop: '20px', marginRight: '400px'}}>
                    <Link to={`/rules/update/${rule.id}`} style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="primary" sx={{fontSize: '1.0rem', padding: '10px 20px'}}>
                            <Words text="Edit rule"/>
                        </Button>
                    </Link>
                </Grid>
            }
        </Grid>
    );
}

export default RulePage;