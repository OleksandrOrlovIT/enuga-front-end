import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Words from "../word/Words";

function EnglishTestCard({ englishTest }) {
    return (
        <Card variant="outlined" style={{ marginBottom: '20px', maxWidth: '300px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h4" component="div" style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Words text={englishTest.testName}/>
                </Typography>
                <Link to={`/english-tests/${englishTest.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        <Words text="View Rule"/>
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}

export default EnglishTestCard;