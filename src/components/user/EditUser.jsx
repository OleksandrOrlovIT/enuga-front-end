import React, {useContext, useState} from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import api from '../auth/api';
import {AuthContext} from "../auth/AuthContext";

const EditUser = ({user, onSuccess}) => {
    const {hasRole} = useContext(AuthContext);
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState(user.roles || []);

    const Roles = ["ROLE_USER_WITHOUT_SUBSCRIPTION",
        "ROLE_USER_WITH_SUBSCRIPTION",
        "ROLE_ENGLISH_STUDENT_USER",
        "ROLE_ENGLISH_TEACHER_USER",
        "ROLE_ADMIN"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            id: user.id,
            email,
            firstName,
            lastName,
            password,
            roles
        };

        try {
            if(!hasRole("ROLE_ADMIN")) {
                await api.put(`/user/${user.id}/without-roles`, updatedUser);
            } else {
                await api.put(`/user/${user.id}`, updatedUser);
            }
            onSuccess();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleRoleChange = (event) => {
        setRoles(event.target.value);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{padding: '20px'}}>
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
                    {hasRole("ROLE_ADMIN") &&
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel id="roles-label">Roles</InputLabel>
                            <Select
                                labelId="roles-label"
                                id="roles"
                                multiple
                                value={roles}
                                onChange={handleRoleChange}
                                label="Roles"
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {Object.values(Roles).map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }
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

export default EditUser;