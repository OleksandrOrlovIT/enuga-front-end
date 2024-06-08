import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./header/Header";
import RulePage from "./rules/RulePage";
import AllRulesPage from "./rules/AllRulesPage";
import {ThemeProvider} from "@mui/material";
import theme from "./materialUI/Theme";
import EnglishTest from "./english-test/EnglishTest";
import AllEnglishTests from "./english-test/AllEnglishTests";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/"/>
                    <Route path="rules/" element={<AllRulesPage/>}/>
                    <Route path="rules/:id" element={<RulePage/>}/>
                    <Route path="english-tests" element={<AllEnglishTests/>}/>
                    <Route path="english-tests/:id" element={<EnglishTest/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;