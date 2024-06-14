import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import api from "../auth/api";
import {Button, MenuItem, TextField, Typography} from "@mui/material";
import CustomPairForm from "./CustomPairForm";
import {AuthContext} from "../auth/AuthContext";

const WordModuleForm = () => {
    const VisibilityOptions = {
        PUBLIC: 'PUBLIC',
        PRIVATE: 'PRIVATE'
    };
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [wordModule, setWordModule] = useState({
        moduleName: '',
        visibility: VisibilityOptions.PUBLIC,
        userId: user.id,
        customPairs: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            api.get(`/word-module/${id}`)
                .then(response => {
                    if (response.data.userId !== user.id){
                        navigate("/home");
                    }
                    setWordModule(response.data);
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setWordModule(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddCustomPair = () => {
        setWordModule(prevState => ({
            ...prevState,
            customPairs: [...prevState.customPairs, { word: '', translation: '' }]
        }));
    };

    const handleDeleteCustomPair = (index) => {
        setWordModule(prevState => ({
            ...prevState,
            customPairs: prevState.customPairs.filter((_, i) => i !== index)
        }));
    };

    const handleCustomPairChange = (index, updatedCustomPair) => {
        setWordModule(prevState => {
            const updatedCustomPairs = [...prevState.customPairs];
            updatedCustomPairs[index] = updatedCustomPair;
            return { ...prevState, customPairs: updatedCustomPairs };
        });
    };

    const handleSubmit = () => {
        console.log("word-module = ", wordModule);
        if (id) {
            api.put(`/word-module/${id}`, wordModule)
                .then(response => {
                    navigate(`/word-modules/${id}`);
                })
                .catch(err => console.log(err));
        } else {
            api.post('/word-module', wordModule)
                .then(response => {
                    navigate(`/word-modules/${response.data.id}`);
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Word Module Form
            </Typography>
            <TextField
                name="moduleName"
                label="Word Module Name"
                variant="outlined"
                fullWidth
                value={wordModule.moduleName}
                onChange={handleChange}
                style={{ marginBottom: '20px' }}
            />
            <TextField
                select
                name="visibility"
                label="Visibility"
                variant="outlined"
                fullWidth
                value={wordModule.visibility}
                onChange={handleChange}
                style={{ marginBottom: '20px' }}
            >
                {Object.values(VisibilityOptions).map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <Typography variant="h6" gutterBottom>
                Word Pairs
            </Typography>
            {wordModule.customPairs.map((customPair, index) => (
                <div key={index}>
                    <CustomPairForm
                        customPair={customPair}
                        onUpdateCustomPair={(updatedCustomPair) => handleCustomPairChange(index, updatedCustomPair)}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteCustomPair(index)}
                        sx={{ margin: '0px 0px 30px 0' }}
                    >
                        Delete CustomPair
                    </Button>
                </div>
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddCustomPair}
                sx={{ margin: '50px 10px 10px 0' }}
            >
                Add Custom Pair
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ margin: '50px 0 10px 0' }}
            >
                {id ? 'Update Word Module' : 'Create Word Module'}
            </Button>
        </div>
    );
}

export default WordModuleForm;