import React, {useEffect, useState} from "react";
import api from "../../auth/api";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";

const EditEnglishTeacher = () => {
    const { englishTeacherId } = useParams();
    const [englishTeacher, setEnglishTeacher] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEnglishTeacher = async () => {
            try {
                const response = await api.get(`/english-teacher/${englishTeacherId}`);
                setEnglishTeacher(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        getEnglishTeacher();
    }, [englishTeacherId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedEnglishTeacher = {
            "englishTeacherId": englishTeacherId,
            "userId": englishTeacher.user.id
        };

        try {
            await api.put(`english-teacher/${englishTeacherId}`, updatedEnglishTeacher);
            navigate("/all-english-teachers/page/1");
        } catch (error) {
            console.error('Error updating english teacher:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{padding: '20px'}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit English Teacher
                </Typography>
                <form onSubmit={handleSubmit}>
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
                    <TextField
                        fullWidth
                        label="User ID"
                        value={englishTeacher.user.id}
                        margin="normal"
                        variant="outlined"
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Update English Teacher
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default EditEnglishTeacher;