import React, { useContext } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Words from "../word/Words";
import { AuthContext } from "../auth/AuthContext";
import {getGradientColor} from "./GradientColor";

function GradientCard({ heading, linkToGet, deleteFunc, lastTryPercentage, bestPercentage,
                          maxWidth = '400px', height = '300px' }) {
    const { hasRole } = useContext(AuthContext);
    const bestTryColor = getGradientColor(bestPercentage);
    const lastTryColor = getGradientColor(lastTryPercentage);

    return (
        <Card variant="outlined" style={{
            marginBottom: '20px',
            maxWidth: maxWidth,
            height: height,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'black',
        }}>
            <CardContent style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <Typography variant="h4" component="div" style={{ marginBottom: '10px', textAlign: 'center' }}>
                    <Words text={heading} />
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '20px', textAlign: 'center', backgroundColor:bestTryColor }}>
                    (Best try = {bestPercentage}%)
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '20px', textAlign: 'center', backgroundColor:lastTryColor }}>
                    (Last try = {lastTryPercentage}%)
                </Typography>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item>
                        <Link to={linkToGet} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary">
                                <Words text="Open" />
                            </Button>
                        </Link>
                    </Grid>
                    {hasRole('ROLE_ENGLISH_TEACHER_USER') &&
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={deleteFunc}>
                                <Words text="Delete" />
                            </Button>
                        </Grid>
                    }
                </Grid>
            </CardContent>
        </Card>
    );
}

export default GradientCard;