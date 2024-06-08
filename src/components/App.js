import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import RulePage from "./rules/RulePage";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/"/>
                <Route path="rules/:id" element={<RulePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;