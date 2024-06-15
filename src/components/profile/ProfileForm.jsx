import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Box, Typography, Paper } from '@mui/material';
import { AuthContext } from '../auth/AuthContext';
import api from '../auth/api';

const ProfileForm = () => {
    const { user, logout } = useContext(AuthContext);
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            id: user.id,
            email,
            firstName,
            lastName,
            password,
        };

        try {
            await api.put(`/user/${user.id}/without-roles`, updatedUser);
            logout();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Profile
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="User ID"
                        value={user.id}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Update Profile
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default ProfileForm;