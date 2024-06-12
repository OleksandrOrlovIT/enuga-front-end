import React, {useContext} from 'react';
import {AppBar, Toolbar, Button, Box, DialogTitle, useTheme} from '@mui/material';
import Words from "../word/Words";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";

const Header = () => {
    const theme = useTheme();
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    {/* Left Section */}
                    <Box>
                        <Link to={`/home`} style={{textDecoration: 'none'}}>
                            <DialogTitle style={{
                                color: theme.palette.white.main,
                                marginLeft: 0,
                                marginRight: 0
                            }}>Enuga.com</DialogTitle>
                        </Link>
                    </Box>

                    {/* Middle Section */}
                    <Box display="flex" justifyContent="center" flexGrow={1}>
                        <Link to={`/rules`} style={{textDecoration: 'none'}}>
                            <Button color="white" style={{marginLeft: 0, marginRight: 0}}><Words text="Rules"/></Button>
                        </Link>
                        <Link to={`/english-tests`} style={{textDecoration: 'none'}}>
                            <Button color="white" style={{marginLeft: 0, marginRight: 0}}><Words text="Tests"/></Button>
                        </Link>
                        <Button color="inherit" style={{marginLeft: 0, marginRight: 0}}><Words
                            text="Word Modules"/></Button>
                        <Link to={`/books/`} style={{textDecoration: 'none'}}>
                            <Button color="white" style={{marginLeft: 0, marginRight: 0}}><Words
                                text="Books"/></Button>
                        </Link>
                        <Link to={`/vocabulary-and-find-words/`} style={{textDecoration: 'none'}}>
                            <Button color="white" style={{marginLeft: 0, marginRight: 0}}><Words
                                text="Vocabulary"/></Button>
                        </Link>
                    </Box>

                    {/* Right Section */}
                    <Box>
                        <Link to={`/profile`} style={{textDecoration: 'none'}}>
                            <Button color="white"><Words text="Profile Page"/></Button>
                        </Link>
                        <Button color="inherit" onClick={handleLogout}><Words text="Leave account"/></Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;