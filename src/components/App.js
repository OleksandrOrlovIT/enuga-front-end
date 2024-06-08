import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./header/Header";
import RulePage from "./rules/RulePage";
import AllRulesPage from "./rules/AllRulesPage";
import {ThemeProvider} from "@mui/material";
import theme from "./materialUI/Theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/"/>
                    <Route path="rules/" element={<AllRulesPage/>}/>
                    <Route path="rules/:id" element={<RulePage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;