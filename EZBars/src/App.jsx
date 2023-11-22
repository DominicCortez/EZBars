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
import ProductsPrice from './pages/ProductsPrice';
import MobileScanner from './pages/MobileScanner';
import AddOrUpdate from './pages/AddOrUpdate';
import Sell from './pages/Sell';

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
        <Route path="/maininv" element={<DisplayInventory/>}/> 
        <Route path="/sale" element={<Sales/>}/> 
        <Route path="/product" element={<ProductsPrice/>}/>
        <Route path="/mobile" element={<MobileScanner/>}/>
        <Route path="/mobileadd" element={<AddOrUpdate/>}/>
        <Route path="/mobilesell" element={<Sell/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App