import React, {useState} from "react";
import api from "../../auth/api";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";

const EditEnglishTeacher = ({englishTeacher, onSuccess}) => {
    const [userId, setUserId] = useState(englishTeacher.user.id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedEnglishTeacher = {
            "userId": userId
        };

        try {
            if(englishTeacher.id) {
                updatedEnglishTeacher.englishTeacherId = englishTeacher.id;
                await api.put(`/english-teacher`, updatedEnglishTeacher);
            } else {
                await api.post(`/english-teacher`, updatedEnglishTeacher);
            }
            onSuccess();
        } catch (error) {
            console.error('Error updating English teacher:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{padding: '20px'}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {englishTeacher.id ? "Edit " : "Create "} English Teacher
                </Typography>
                <form onSubmit={handleSubmit}>
                    {englishTeacher.id && (
                        <TextField
                            fullWidth
                            label="English Teacher ID"
                            value={englishTeacher.id}
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
                        onChange={(e) => setUserId(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {englishTeacher.id ? "Update " : "Create "} English Teacher
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default EditEnglishTeacher;