import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/index.js";
import Home from "./pages/Home/index.js";
import FirstChat from "./pages/Home/firstChat.js";
import CustomizePage from "./pages/customizePage/text.index.js";

import Cookies from "js-cookie";
import OAuthRedirectHandler from "./redirect/Redirect.js";

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return window.localStorage.getItem("token");
    });
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

function App() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return window.localStorage.getItem("token");
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/chat"); // Redirect to /chat if authenticated
        }
    }, [isAuthenticated, navigate]);

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/redirect" element={<OAuthRedirectHandler />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/chat" element={<FirstChat />} />
                <Route path="/chat/:id" element={<Home />} />
                <Route path="/customize/:id" element={<CustomizePage />} />
            </Route>
        </Routes>
    );
}

export default App;
