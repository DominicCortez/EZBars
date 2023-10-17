import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ErrorPage from './pages/ErrorPage';
import Post from './pages/Post'
import DisplayInventory from './pages/DisplayInventory';
import MainMenu from './pages/MainMenu';
import Sales from './pages/Sales';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/main" element={<MainMenu/>}/>
        <Route path="/select/:id" element={<Post/>}/>
        <Route path="/inventory" element={<DisplayInventory/>}/> 
        <Route path="/sales" element={<Sales/>}/> 
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App