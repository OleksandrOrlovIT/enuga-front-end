import React from 'react';
import {AppBar, Toolbar, Button, Box, DialogTitle, useTheme} from '@mui/material';
import Words from "../word/Words";
import {Link} from "react-router-dom";

const Header = () => {
    const theme = useTheme();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    {/* Left Section */}
                    <Box>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <DialogTitle style={{ color: theme.palette.white.main, marginLeft: 0, marginRight: 0 }}>Enuga.com</DialogTitle>
                        </Link>
                    </Box>

                    {/* Middle Section */}
                    <Box display="flex" justifyContent="center" flexGrow={1}>
                        <Link to={`/rules`} style={{ textDecoration: 'none' }}>
                            <Button color="white" style={{ marginLeft: 0, marginRight: 0 }}><Words text="Rules" /></Button>
                        </Link>
                        <Link to={`/english-tests`} style={{ textDecoration: 'none' }}>
                            <Button color="white" style={{ marginLeft: 0, marginRight: 0 }}><Words text="Tests" /></Button>
                        </Link>
                        <Button color="inherit" style={{ marginLeft: 0, marginRight: 0 }}><Words text="Word Modules" /></Button>
                        <Button color="inherit" style={{ marginLeft: 0, marginRight: 0 }}><Words text="Books" /></Button>
                        <Button color="inherit" style={{ marginLeft: 0, marginRight: 0 }}><Words text="Vocabulary" /></Button>
                    </Box>

                    {/* Right Section */}
                    <Box>
                        <Button color="inherit"><Words text="Profile" /></Button>
                        <Button color="inherit"><Words text="Leave account" /></Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;