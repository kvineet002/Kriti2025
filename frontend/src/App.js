import React, {useState, useEffect} from 'react'
import {Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/index.js";
import Home from "./pages/Home/index.js"

const ProtectedRoutes = () =>{
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return window.localStorage.getItem('isAuthenticated');
  });
  return isAuthenticated ? <Outlet/> : <Navigate to='/'/>;
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/home' element={<Home/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
