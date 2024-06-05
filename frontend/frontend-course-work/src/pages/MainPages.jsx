import React from 'react';
import WeatherModal from "../components/WeatherModal.jsx";

const MainPages = () => {
  const backgroundStyle = {
    backgroundImage: 'url(/background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '90vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
      <div style={backgroundStyle}>
        <WeatherModal/>
      </div>
  );
};

export default MainPages;