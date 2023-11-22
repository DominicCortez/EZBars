import React from 'react'
import { useNavigate } from 'react-router-dom';

const MobileScanner = () => {

    const navigate = useNavigate();

    const navigateAdd = () => {
        navigate('/mobileadd');
    };

    const navigateSell = () => {
        navigate('/mobilesell');
    };

  return (
    <div>
        <button onClick={navigateAdd}>Add or Update</button>
        <hr></hr>
        <button onClick={navigateSell}>Sales</button>
    </div>
  )
}

export default MobileScanner