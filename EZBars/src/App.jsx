import React from 'react';
import Navbar from './components/Navbar';
import { Hero,Footer } from './components';
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Footer/>
    </div>
  )
}

export default App