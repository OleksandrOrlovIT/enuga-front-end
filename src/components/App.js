import React, {useContext} from "react";
import {BrowserRouter, Route, Routes, useLocation, Navigate} from "react-router-dom";
import Header from "./header/Header";
import RulePage from "./rules/RulePage";
import AllRulesPage from "./rules/AllRulesPage";
import {ThemeProvider} from "@mui/material";
import theme from "./materialUI/Theme";
import EnglishTest from "./english-test/EnglishTest";
import AllEnglishTests from "./english-test/AllEnglishTests";
import VocabularyPage from "./vocabulary/VocabularyPage";
import VocabularyAndFindWordPage from "./vocabulary/VocabularyAndFindWordPage";
import TranslateEnglishPage from "./vocabulary/findwords/TranslateEnglishPage";
import TranslateUkrainianPage from "./vocabulary/findwords/TranslateUkrainianPage";
import ReadBookPage from "./book/ReadBookPage";
import AllBookCards from "./book/AllBookCards";
import LoginPage from "./auth/LoginPage";
import {AuthContext, AuthProvider} from "./auth/AuthContext";
import SignUpPage from "./auth/SignUpPage";
import HomePage from "./home/HomePage";
import ProfilePage from "./profile/ProfilePage";

const AppContent = () => {
    const {user, hasRole} = useContext(AuthContext);
    console.log(user);
    const location = useLocation();
    const isLoginPage = location.pathname === '/';
    const isSignupPage = location.pathname === '/signup';

    return (
        <>
            {(user && !isLoginPage && !isSignupPage) && <Header/>}
            <Routes>
                {user ? (
                        <>
                            <Route path="/home" element={<HomePage/>}/>
                            <Route path="/rules" element={<AllRulesPage/>}/>
                            <Route path="/rules/:id" element={<RulePage/>}/>
                            <Route path="/english-tests" element={<AllEnglishTests/>}/>
                            <Route path="/english-tests/:id" element={<EnglishTest/>}/>
                            <Route path="/vocabulary-and-find-words" element={<VocabularyAndFindWordPage/>}/>
                            <Route path="/vocabulary/:page" element={<VocabularyPage/>}/>
                            <Route path="/translate-eng" element={<TranslateEnglishPage/>}/>
                            <Route path="/translate-ukr" element={<TranslateUkrainianPage/>}/>
                            {hasRole('ROLE_USER_WITH_SUBSCRIPTION') && (
                                <Route path="/books" element={<AllBookCards/>}/>
                            )}
                            <Route path="/books/:id/page/:pageNumber" element={<ReadBookPage/>}/>
                            <Route path="/profile" element={<ProfilePage/>}/>
                            <Route path="*" element={<Navigate to="/home"/>}/>
                        </>
                    ) :
                    (
                        <>
                            <Route path="/" element={<LoginPage/>}/>
                            <Route path="/signup" element={<SignUpPage/>}/>
                            <Route path="*" element={<Navigate to="/"/>}/>
                        </>
                    )}
            </Routes>
        </>
    );
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <BrowserRouter>
                    <AppContent/>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;