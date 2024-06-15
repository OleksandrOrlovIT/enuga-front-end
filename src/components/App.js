import React, {useContext} from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
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
import RuleForm from "./rules/RuleForm";
import EnglishTestForm from "./english-test/EnglishTestForm";
import ProtectedRoute from "./auth/ProtectedRoute";
import BookForm from "./book/BookForm";
import AllTestStatsPage from "./test-stat/english-test/AllTestStatsPage";
import AllWordModules from "./word-module/AllWordModules";
import WordModule from "./word-module/WordModule";
import WordModuleForm from "./word-module/WordModuleForm";
import AllPublicWordModulesWithoutUser from "./word-module/public/AllPublicWordModulesWithoutUser";
import AllUserWordModulesPage from "./word-module/user-modules/AllUserWordModulesPage";
import AllWordModuleStatsPage from "./test-stat/word-module/AllWordModuleStatsPage";

const AppContent = () => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    const isLoginPage = location.pathname === '/';
    const isSignupPage = location.pathname === '/signup';

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {(user && !isLoginPage && !isSignupPage) && <Header/>}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/rules" element={<AllRulesPage />} />
                    <Route path="/rules/:id" element={<RulePage />} />
                    <Route path="/english-tests" element={<AllEnglishTests />} />
                    <Route path="/english-tests/:id" element={<EnglishTest />} />
                    <Route path="/english-tests/stats/:pageNumber" element={<AllTestStatsPage />} />

                    <Route path="/word-modules" element={<AllWordModules />} />
                    <Route path="/word-modules/public/:pageNumber" element={<AllPublicWordModulesWithoutUser />} />
                    <Route path="/word-modules/user/:pageNumber" element={<AllUserWordModulesPage />} />
                    <Route path="/word-modules/:id" element={<WordModule />} />
                    <Route path="/word-modules/create" element={<WordModuleForm />} />
                    <Route path="/word-modules/update/:id" element={<WordModuleForm />} />
                    <Route path="/word-modules/stats/:pageNumber" element={<AllWordModuleStatsPage />} />

                    <Route path="/vocabulary-and-find-words" element={<VocabularyAndFindWordPage />} />
                    <Route path="/vocabulary/:page" element={<VocabularyPage />} />
                    <Route path="/translate-eng" element={<TranslateEnglishPage />} />
                    <Route path="/translate-ukr" element={<TranslateUkrainianPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                <Route element={<ProtectedRoute role="ROLE_ENGLISH_TEACHER_USER" />}>
                    <Route path="/rules/create" element={<RuleForm />} />
                    <Route path="/rules/update/:id" element={<RuleForm />} />
                    <Route path="/english-tests/create" element={<EnglishTestForm />} />
                    <Route path="/english-tests/update/:id" element={<EnglishTestForm />} />

                    <Route path="/books/create" element={<BookForm />} />
                    <Route path="/books/update/:id" element={<BookForm />} />
                </Route>

                <Route element={<ProtectedRoute role="ROLE_USER_WITH_SUBSCRIPTION" />}>
                    <Route path="/books" element={<AllBookCards />} />
                    <Route path="/books/:id/page/:pageNumber" element={<ReadBookPage />} />
                </Route>
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