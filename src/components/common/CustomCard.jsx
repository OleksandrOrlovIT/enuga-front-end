import React, { useContext } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Words from "../word/Words";
import { AuthContext } from "../auth/AuthContext";

function CustomCard({ heading, linkToGet, deleteFunc, maxWidth = '300px', height = '200px' }) {
    const { hasRole } = useContext(AuthContext);

    return (
        <Card variant="outlined" style={{
            marginBottom: '20px',
            maxWidth: maxWidth,
            height: height,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <CardContent style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <Typography variant="h4" component="div" style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Words text={heading} />
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

export default CustomCard;