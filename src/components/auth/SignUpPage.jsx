import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
} from '@mui/material';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            if (!email || !password || !confirmPassword || !firstName || !lastName) {
                setError('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const response = await axios.post('http://localhost:8080/v1/auth/signup', {
                "email" : email,
                "password" : password,
                "firstName" : firstName,
                "lastName" : lastName
            });
            navigate('/');
        } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Container maxWidth="sm">
                <Box p={4} bgcolor="white" boxShadow={3} borderRadius={2}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Sign Up Page
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="FirstName"
                        variant="outlined"
                        margin="normal"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="LastName"
                        variant="outlined"
                        margin="normal"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSignup}
                    >
                        Sign Up
                    </Button>
                    <Typography align="center" margin="normal">
                        Already Registered? <a href="/">Login</a>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default SignUpPage;
