import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Paper, Box } from '@mui/material';
import api from "../auth/api";

const RuleForm = () => {
    const { id } = useParams();
    const [rule, setRule] = useState({ ruleName: '', description: '' });
    const [isLoading, setIsLoading] = useState(!!id);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            api.get(`/rule/${id}`)
                .then(response => {
                    console.log(response.data);
                    setRule(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("There was an error fetching the rule!", error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRule(prevRule => ({
            ...prevRule,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = id ? api.put(`/rule/${id}`, rule) : api.post('/rule', rule);
        request
            .then(response => {
                const newId = response.data.id;
                navigate(id ? `/rules/${id}` : `/rules/${newId}`);
            })
            .catch(error => {
                console.error(`There was an error ${id ? 'updating' : 'creating'} the rule!`, error);
            });
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Grid container justifyContent="center" style={{ margin: '40px 20px' }}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h3" align="center">
                        {id ? 'Edit Rule' : 'Create Rule'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} mt={2}>
                        <TextField
                            fullWidth
                            label="Rule Name"
                            name="ruleName"
                            value={rule.ruleName}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={rule.description}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '20px' }}
                        >
                            {id ? 'Save Changes' : 'Create Rule'}
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default RuleForm;