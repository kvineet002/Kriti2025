import React, {useState, useEffect} from 'react'
import {Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/index.js";
import Home from "./pages/Home/index.js"
import FirstChat from './pages/Home/firstChat.js';
import CustomizePage from './pages/customizePage/index.js';
import OAuthRedirectHandler from './redirect/Redirect.js';
import SharedPage from './pages/sharedPage/SharedPage.js';

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token') // Convert to boolean
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};





function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!window.localStorage.getItem('token') // Convert to boolean
  );

  useEffect(() => {
    if (isAuthenticated && window.location.pathname === '/') {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/redirect' element={<OAuthRedirectHandler/>}/>
        <Route path='/chat/s/:id' element={<SharedPage/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/chat' element={<FirstChat/>}/>
          <Route path='/chat/:id' element={<Home/>}/>
          <Route path='/customize/:id' element={<CustomizePage/>}/>
          <Route path="*" element={<Navigate to="/chat" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
