import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Words from "../word/Words";

function CustomCard({ heading, linkTo, maxWidth = '300px', height = '200px' }) {
    return (
        <Card variant="outlined" style={{ marginBottom: '20px', maxWidth: maxWidth, height: height, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h4" component="div" style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Words text={heading} />
                </Typography>
                <Link to={linkTo} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        <Words text="Open" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}

export default CustomCard;