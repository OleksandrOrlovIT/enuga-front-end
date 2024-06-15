import React, {useContext} from 'react';
import {
    Container,
    Typography,
    Box,
    Paper, Button,
} from '@mui/material';
import {AuthContext} from "../auth/AuthContext";
import LastTestAttemptsList from "../test-stat/english-test/LastTestAttemptsList";
import LastWordModuleAttemptsList from "../test-stat/word-module/LastWordModuleAttemptsList";
import Words from "../word/Words";
import {Link} from "react-router-dom";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <Container maxWidth="lg">
            <Box mt={4}>
                {/* User Information */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4">
                        FirstName: {user.firstName}, LastName: {user.lastName}
                    </Typography>
                    <Typography variant="body1">
                        Email: {user.email}
                    </Typography>
                    <Link to={`/profile/edit`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">
                            <Words text="Edit Profile" />
                        </Button>
                    </Link>
                </Box>

                {/* Stat Components */}
                <Box display="flex" justifyContent="space-between">
                    <Paper elevation={3} style={{ padding: '20px', flex: '1 0 48%' }}>
                        <LastTestAttemptsList pageSize={5} isMinimized={true} />
                    </Paper>
                    <Paper elevation={3} style={{ padding: '20px', flex: '1 0 48%' }}>
                        <LastWordModuleAttemptsList pageSize={5} isMinimized={true} />
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default ProfilePage;