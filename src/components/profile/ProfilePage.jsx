import React, {useContext} from 'react';
import {
    Container,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Paper,
} from '@mui/material';
import {AuthContext} from "../auth/AuthContext";
import LastTestAttemptsList from "../test-stat/LastTestAttemptsList";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <Container maxWidth="lg">
            <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap">
                {/* Profile Information */}
                <Paper elevation={3} style={{ padding: '20px', flex: '1 0 45%', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" gutterBottom>
                        User Profile
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Email" secondary={user.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="First Name" secondary={user.firstName} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Last Name" secondary={user.lastName} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Roles"
                                secondary={user.roles && user.roles.map(role => role).join(', ')}
                            />
                        </ListItem>
                    </List>
                </Paper>

                {/* Test Attempt Statistics */}
                <Paper elevation={3} style={{ padding: '20px', flex: '1 0 45%', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                    <LastTestAttemptsList pageSize={5} isMinimized={true} />
                </Paper>
            </Box>
        </Container>
    );
};

export default ProfilePage;