import React, { useState, useEffect } from 'react';
import '../css/pre-loader.css';

const Preloader = () => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots % 3) + 1);
    }, 500); // Change the interval time as needed (milliseconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader-container">
      <div className='preloader-div'>
        <div className="preloader"></div>
      </div>
      <div className='preloader-text white-text'>
        Loading{Array(dots).fill('.').join('')}
      </div>
    </div>
  );
};

export default Preloader;
