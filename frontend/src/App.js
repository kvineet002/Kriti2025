import React, {useState, useEffect} from 'react'
import {Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/index.js";
import Home from "./pages/Home/index.js"
import FirstChat from './pages/Home/firstChat.js';
import CustomizePage from './pages/customizePage/index.js';
import Cookies from 'js-cookie';
import OAuthRedirectHandler from './redirect/Redirect.js';
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

const ProtectedRoutes = () =>{
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token')||true;
  });
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet/> : <Navigate to='/'/>;
}




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/redirect' element={<OAuthRedirectHandler/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/chat' element={<FirstChat/>}/>
          <Route path='/chat/:id' element={<Home/>}/>
          <Route path='/customize/:id' element={<CustomizePage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
