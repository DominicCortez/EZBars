import React from 'react';
import Navbar from './components/Navbar';
import { Hero,Footer,FooterEnd } from './components';
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Footer/>
      <FooterEnd/>
    </div>
  )
}

export default App