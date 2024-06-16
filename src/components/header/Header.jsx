import React, {useContext} from 'react';
import {AppBar, Toolbar, Button, Box, DialogTitle, useTheme} from '@mui/material';
import Words from "../word/Words";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";

const Header = () => {
    const theme = useTheme();
    const { logout, hasRole, notRole } = useContext(AuthContext);
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
                        <Link to={`/home`} style={{ textDecoration: 'none' }}>
                            <DialogTitle style={{
                                color: theme.palette.white.main,
                                marginLeft: 0,
                                marginRight: 0
                            }}>Enuga.com</DialogTitle>
                        </Link>
                    </Box>

                    {/* Middle Section */}
                    <Box display="flex" justifyContent="center" flexGrow={1}>
                        <Link to={`/rules`} style={{ textDecoration: 'none', margin: '0 5px' }}>
                            <Button color="white"><Words text="Rules" /></Button>
                        </Link>
                        <Link to={`/english-tests`} style={{ textDecoration: 'none', margin: '0 5px' }}>
                            <Button color="white"><Words text="Tests" /></Button>
                        </Link>
                        <Link to={`/word-modules`} style={{ textDecoration: 'none', margin: '0 5px' }}>
                            <Button color="white"><Words text="Word Modules" /></Button>
                        </Link>
                        <Link to={`/books/`} style={{ textDecoration: 'none', margin: '0 5px' }}>
                            <Button color="white"><Words text="Books" /></Button>
                        </Link>
                        <Link to={`/vocabulary-and-find-words/`} style={{ textDecoration: 'none', margin: '0 5px' }}>
                            <Button color="white"><Words text="Vocabulary" /></Button>
                        </Link>
                    </Box>

                    {/* Right Section */}
                    <Box>
                        {!hasRole('ROLE_USER_WITH_SUBSCRIPTION') && (
                            <Link to="/upgrade-account" style={{ textDecoration: 'none' }}>
                                <Button color="white">
                                    <Words text="Upgrade account" />
                                </Button>
                            </Link>
                        )}
                        {hasRole('ROLE_ENGLISH_TEACHER_USER') && notRole('ROLE_ADMIN') &&  (
                            <Link to="/all-english-students/page/1" style={{ textDecoration: 'none', marginLeft: '10px' }}>
                                <Button color="white">
                                    <Words text="Your English Students" />
                                </Button>
                            </Link>
                        )}
                        {hasRole('ROLE_ADMIN') && (
                            <Link to="/admin/all-english-students/page/1" style={{ textDecoration: 'none', marginLeft: '10px' }}>
                                <Button color="white">
                                    <Words text="All English Students" />
                                </Button>
                            </Link>
                        )}
                        {hasRole('ROLE_ADMIN') && (
                            <Link to="/admin/all-english-teachers/page/1" style={{ textDecoration: 'none', marginLeft: '10px' }}>
                                <Button color="white">
                                    <Words text="All English Teachers" />
                                </Button>
                            </Link>
                        )}
                        {hasRole('ROLE_ADMIN') && (
                            <Link to="/admin/all-users/page/1" style={{ textDecoration: 'none', marginLeft: '10px' }}>
                                <Button color="white">
                                    <Words text="All Users" />
                                </Button>
                            </Link>
                        )}
                        <Link to={`/profile`} style={{ textDecoration: 'none', marginLeft: '10px' }}>
                            <Button color="white"><Words text="Profile Page" /></Button>
                        </Link>
                        <Button color="inherit" onClick={handleLogout} style={{ marginLeft: '10px' }}><Words text="Leave account" /></Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;