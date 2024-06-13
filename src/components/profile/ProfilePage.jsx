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
import LastTestAttemptsList from "../common/LastTestAttemptsList";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <Container maxWidth="lg">
            <Box mt={4} display="flex" justifyContent="space-between">
                {/* Profile Information */}
                <Paper elevation={3} style={{ padding: '20px', flex: '1 0 45%' }}>
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
                                secondary={user.roles && user.roles.map(role => role).join(',\n')}
                            />
                        </ListItem>
                    </List>
                </Paper>

                {/* Test Attempt Statistics */}
                <LastTestAttemptsList numStats={5} />
            </Box>
        </Container>
    );
};

export default ProfilePage;