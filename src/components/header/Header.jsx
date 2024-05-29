import React from 'react';
import {AppBar, Toolbar, Button, Box, DialogTitle} from '@mui/material';
import Words from "../word/Words";

const Header = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    {/* Left Section */}
                    <Box>
                        <DialogTitle color="inherit">Enuga.com</DialogTitle>
                    </Box>

                    {/* Middle Section */}
                    <Box display="flex" justifyContent="center" flexGrow={1}>
                        <Button color="inherit" style={{ marginLeft: 0, marginRight: 0 }}><Words text="Tests & Rules" /></Button>
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