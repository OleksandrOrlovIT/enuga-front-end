import React, { useContext } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Words from "../word/Words";
import { AuthContext } from "../auth/AuthContext";

const getGradientColor = (percentage) => {
    const startColor = { r: 255, g: 0, b: 0 };
    const endColor = { r: 0, g: 255, b: 0 };

    const r = startColor.r + percentage * (endColor.r - startColor.r) / 100;
    const g = startColor.g + percentage * (endColor.g - startColor.g) / 100;
    const b = startColor.b + percentage * (endColor.b - startColor.b) / 100;

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

function GradientCard({ heading, linkToGet, deleteFunc, successPercentage, lastTryPercentage, bestPercentage,
                          maxWidth = '400px', height = '300px' }) {
    const { hasRole } = useContext(AuthContext);
    const backgroundColor = getGradientColor(successPercentage);

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
                <Typography variant="body1" style={{ marginBottom: '20px', textAlign: 'center', backgroundColor:backgroundColor }}>
                    (Best try = {bestPercentage}%)
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '20px', textAlign: 'center', backgroundColor:backgroundColor }}>
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