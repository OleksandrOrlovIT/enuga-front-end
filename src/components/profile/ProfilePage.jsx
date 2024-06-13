import React, { useContext } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper } from '@mui/material';
import {AuthContext} from "../auth/AuthContext";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
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
            </Box>
        </Container>
    );
};

export default ProfilePage;
