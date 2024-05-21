import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import Header from '../Components/Header';
import amkaAboutUs from './amka-aboutus.jpeg'; // Importez l'image en tant que variable

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };
  
  return (
    <div className="welcome-page">
      <Header />
      <div className="welcome-container">
        <div className="left-column">
          <div className="left-circle">
            {/* Utilisez l'élément img pour afficher l'image */}
            <img src={amkaAboutUs} alt="Emka About Us" />
          </div>
          <div className="welcome-content">
            <h1>Bienvenue chez Emka Med</h1>
            <p>Où le travail acharné est récompensé chaque jour.</p>
            <p>Ensemble, nous pouvons atteindre l'excellence !</p>
            <button onClick={handleStart}>Démarrer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
