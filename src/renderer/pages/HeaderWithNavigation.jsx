import React from 'react';
import './ficheDeControleQalitasCMS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Importez Link et useNavigate

const HeaderWithNavigation = ({ pageTitle, nextPagePath }) => {
    const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation

    const handleGoBack = () => {
        navigate(-1); // Utilisez navigate(-1) pour revenir à la page précédente
    };

    return (
        <header className="header-with-navigation">
            <div className="left-icons">
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleGoBack} style={{ marginLeft: '5px' }} />
                {/* Utilisez Link pour naviguer vers la page suivante si nextPagePath est défini */}
                {nextPagePath && <Link to={nextPagePath}><FontAwesomeIcon icon={faArrowRight} /></Link>}
            </div>
            
            
        </header>
    );
};

export default HeaderWithNavigation;
