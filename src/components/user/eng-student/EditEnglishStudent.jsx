import React, {useState} from "react";
import api from "../../auth/api";
import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";

const EditEnglishStudent = ({englishStudent, onSuccess}) => {
    const [englishTeacherId, setEnglishTeacherId] = useState(englishStudent.englishTeacherId);
    const [userId, setUserId] = useState(englishStudent.user.id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedEnglishStudent = {
            "englishStudentId": englishStudent.id,
            "userId": userId,
        };

        try {
            updatedEnglishStudent.englishTeacherId = englishTeacherId;
            if(englishStudent.id) {
                await api.put(`/english-student`, updatedEnglishStudent);
            } else {
                await api.post(`/english-student`, updatedEnglishStudent);
            }
            onSuccess();
        } catch (error) {
            console.error('Error updating English Student:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{padding: '20px'}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {englishStudent.id ? "Edit " : "Create "} English Teacher
                </Typography>
                <form onSubmit={handleSubmit}>
                    {englishStudent.id && (
                        <TextField
                            fullWidth
                            label="English Student ID"
                            value={englishStudent.id}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    )}
                    <TextField
                        fullWidth
                        label="User ID"
                        value={userId}
                        InputProps={{
                            readOnly: englishStudent.user.id !== "",
                        }}
                        onChange={(e) => setUserId(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                        <TextField
                            fullWidth
                            label="English Teacher ID"
                            value={englishTeacherId}
                            onChange={(e) => setEnglishTeacherId(e.target.value)}
                            margin="normal"
                            variant="outlined"
                        />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {englishStudent.id ? "Update " : "Create "} English Student
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default EditEnglishStudent;