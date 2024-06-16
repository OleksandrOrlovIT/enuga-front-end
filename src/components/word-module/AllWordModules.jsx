import React from "react";
import {Box, Button, Container} from "@mui/material";
import {useNavigate} from "react-router-dom";

function AllWordModules() {
    const navigate = useNavigate();

    const handlePublicModulesClick = () => {
        navigate('/word-modules/public/1');
    };

    const handleUserModulesClick = () => {
        navigate('/word-modules/user/1');
    };

    return (
        <Container>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                height="100vh"
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePublicModulesClick}
                    sx={{
                        width: '300px',
                        height: '100px',
                        fontSize: '1.5rem',
                        margin: '20px 0'
                    }}
                >
                    Public Word Modules
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleUserModulesClick}
                    sx={{
                        width: '300px',
                        height: '100px',
                        fontSize: '1.5rem',
                        margin: '20px 0'
                    }}
                >
                    Your Word Modules
                </Button>
            </Box>
        </Container>
    );
}

export default AllWordModules;