// Aboutus.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import styles from './Aboutus.module.css'; // Assurez-vous que le chemin est correct
import image1 from './ABOUT.jpeg'; // Chemin d'accès à la première image
import image2 from './TRAD.jpg'; // Chemin d'accès à la deuxième image
import logo from './emkameedd.png'; // Chemin d'accès au logo

const Aboutus = () => {
  // Fonction pour ouvrir les liens des réseaux sociaux dans un nouvel onglet
  const openSocialLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.bggg}>
      <div className={styles.aboutContainer}>
        <div className={styles.header}>
          <Link to="/" className={styles.backLink}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowIcon} /> Retour
          </Link>
          <img src={logo} alt="EmkaMed Logo" className={styles.logo} />
        </div>
        <div className={styles.imageContainer}>
          <img src={image1} alt="Image 1" className={styles.image} />
          <img src={image2} alt="Image 2" className={styles.image} />
        </div>
        <div className={styles.aboutBox}>
          <p className={styles.aboutText}>
            Votre sous-traitant électronique et électrotechnique Tunisien pour une fabrication aux standards Européens
            Filiale du groupe français Emka Electronique, Emka Med assure la fabrication de vos cartes électroniques et gère la logistique, du sourcing des composants à l’expédition de vos produits.
          </p>
        </div>
      </div>
      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          {/* Contact */}
          <div className={styles.contact}>
            <h3>Contact</h3>
            <p>+216 99851200</p>
            <p>sami.ben.mansour@emkaelec.com</p>
            <p>Rue Albdallah Farhat</p>
            <p>Ourdanine</p>
            <p>5010 Monastir Tunisie</p>
          </div>
          {/* Réseaux sociaux */}
          <div className={styles.socialMedia}>
            <h3>Réseaux sociaux</h3>
            <div className={styles.icons}>
              <FontAwesomeIcon icon={faLinkedin} className={styles.icon} onClick={() => openSocialLink('https://www.linkedin.com/company/emka-med-electronique/')} />
              <FontAwesomeIcon icon={faFacebook} className={styles.icon} onClick={() => openSocialLink('https://www.facebook.com/EmkaMedTunisie?__tn__=%3C%3C*F')} />
              <FontAwesomeIcon icon={faYoutube} className={styles.icon} onClick={() => openSocialLink('https://www.youtube.com/channel/UCkzp1TdGopyRloMhJ5TdzVw#')} />
            </div>
          </div>
          {/* Secteurs */}
          <div className={styles.sectors}>
            <h3>Secteurs</h3>
            <ul>
              <li>Médical</li>
              <li>Lightning et signalisation</li>
              <li>Défense</li>
              <li>Aéronautique</li>
              <li>Telecom et IOT</li>
              <li>Ferroviaire</li>
              <li>Agriculture</li>
              <li>Smart City</li>
            </ul>
          </div>
          {/* Site */}
          <div className={styles.site}>
            <h3 >page</h3>
            <ul>
              <li>Log in </li>
              <li>About us</li>
              <li>departement</li>
              <li>of</li>
              <li>Fiche De Controle Qualitas pour Cablage</li>
              <li>Fiche De Controle Qualitas pour CMS</li>
              <li>Fiche De Controle Qualitas pour TRAD</li>

            </ul>
          </div>
        </div>
        {/* Logo */}
        <div className={styles.logologo}>
          <img src={logo} alt="EmkaMed Logo" className={styles.logo} />
        </div>
      </footer>
    </div>
  );
}

export default Aboutus;
