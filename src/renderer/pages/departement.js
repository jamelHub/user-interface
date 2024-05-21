import React, { useState } from 'react';
import './departement.css';
import { Link, useNavigate } from 'react-router-dom';
import HeaderWithNavigation from './HeaderWithNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import cmsImage from './CMS.jpg';
import cablageImage from './CABLAGE.jpg';
import tradImage from './TRAD.jpg';
import { useLocation } from 'react-router-dom';


const Departement = () => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();
  const location = useLocation();
  const {ofId} = location.state;


  console.log(" of id ", location.state.of);

  const handleButtonClick = async (departement) => {
    try {
      const response = await fetch('http://localhost:8080/api/departements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Assurez-vous de définir le token
        },
        body: JSON.stringify({ name: departement, description: `Fiche de controle ${departement}` }), // Ajoutez les données requises
      });

      if (!response.ok) {
        throw new Error(`Failed to add departement ${departement}`);
      }

      console.log(`departement ${departement} ajouté avec succès`);
      
      // Naviguer vers la page correspondante
      navigate(`/${departement}` ,{ state: {   matricule : location.state.matricule , of :location.state.of} });
    } catch (error) {
      console.error(`Erreur lors de l'ajout du département ${departement}:`, error);
    }
  };

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ cursor: 'pointer', marginRight: '10px', marginLeft: '-120px', marginTop: '-90px' }}
          onMouseEnter={(e) => (e.target.style.color = 'green')}
          onMouseLeave={(e) => (e.target.style.color = 'blue')}
        />
        <h2 style={{ color: '#007bff', textAlign: 'center', fontSize: '3.5rem', flex: 1, fontFamily: 'Georgia, serif' }}>
          <em>Choisissez votre Département</em>
        </h2>
        <Link to="/login" style={{ marginLeft: '20px' }}>
            <button style={{ padding: '5px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc' }}>
              Retour à la connexion
            </button>
          </Link>
      </header>
           
      <div className="buttonContainer">
        <strong>
          <button>
            <Link to="/cms" onClick={() => handleButtonClick('CMS')} style={{ color: '#007bff' }}>
              <em style={{ display: 'inline-block' }}>CMS</em>
            </Link>
          </button>
          <img src={cmsImage} alt="CMS" className="departmentImage" />
        </strong>
        <strong>
          <button>
            <Link to="/trad" onClick={() => handleButtonClick('TRAD')}>
              <em>TRAD</em>
            </Link>
          </button>
          <img src={tradImage} alt="TRAD" className="departmentImage" />
        </strong>
        <strong>
          <button>
            <Link to="/cablage" onClick={() => handleButtonClick('CABLAGE')} style={{ color: '#007bff' }}>
              <em>CABLAGE</em>
            </Link>
          </button>
          <img src={cablageImage} alt="CABLAGE" className="departmentImage" />
        </strong>
      </div>
    </div>
  );
};

export default Departement;
