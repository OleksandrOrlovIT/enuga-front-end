import React from 'react';
import { Container, Paper, Box } from '@mui/material';
import LastTestAttemptsList from "../test-stat/english-test/LastTestAttemptsList";
import LastWordModuleAttemptsList from "../test-stat/word-module/LastWordModuleAttemptsList";

function HomePage() {
    return (
        <Container maxWidth="lg" style={{ marginTop: '40px' }}>
            <Box mb={2}>
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                    <LastTestAttemptsList pageSize={5} isMinimized={true} />
                </Paper>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <LastWordModuleAttemptsList pageSize={5} isMinimized={true} />
                </Paper>
            </Box>
        </Container>
    );
}

export default HomePage;