import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { AuthContext } from './AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                setError('Please enter both email and password.');
                return;
            }

            const body = {
                email: email,
                password: password
            };

            const response = await axios.post('http://localhost:8080/v1/auth/login', body);

            const { token, userWithoutPassResponse } = response.data;
            login(token, userWithoutPassResponse);

            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Invalid username or password.');
        }
    };

    return (
        <Container
            maxWidth="xs"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
        >
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: 1,
                    borderRadius: 2,
                    padding: 4,
                    width: '100%',
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom>
                    Login Page
                </Typography>
                <TextField
                    label="Email address"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <Typography color="error" variant="body2" align="center">
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '16px', height: '50px' }}
                >
                    Sign in
                </Button>
                <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                    Not a member? <Link to="/signup">Register</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default LoginPage;