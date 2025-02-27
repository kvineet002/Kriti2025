import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/index.js";
import Home from "./pages/Home/index.js";
import FirstChat from './pages/Home/firstChat.js';
import CustomizePage from './pages/customizePage/index.js';
import OAuthRedirectHandler from './redirect/Redirect.js';
import SharedPage from './pages/sharedPage/SharedPage.js';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Loader from './components/Home/loading.js';

const LoadingScreen = () => (
  <div className="h-screen w-screen flex justify-center items-center">
    <Loader w={30} h={30} />
  </div>
);
const ErrorScreen = () => (
  <div className="h-screen w-screen flex flex-col justify-center items-center">
    <h1 className="text-9xl text-opacity-20 text-white  font-extrabold ">404</h1>
    <h2 className="text-white text-opacity-80 font-semibold">Page Not Found</h2>
  </div>
);

const ProtectedRoutes = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` means checking auth

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token && window.location.pathname === '/') {
      navigate('/chat');
    }
  }, [navigate]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Show loading screen while checking authentication
  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Routes>
        <Route path="*" element={<ErrorScreen />} />  
        <Route path="/" element={isAuthenticated ? <Navigate to="/chat" /> : <LandingPage />} />
        <Route path="/redirect" element={<OAuthRedirectHandler />} />
        <Route path="/chat/s/:id" element={<SharedPage />} />
        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/chat" element={<FirstChat />} />
          <Route path="/chat/:id" element={<Home />} />
          <Route path="/customize/:id" element={<CustomizePage />} />
        </Route>
      </Routes>
      <SpeedInsights />
    </>
  );
}

export default App;
