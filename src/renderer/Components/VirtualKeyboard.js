import React, { useState } from 'react';
import Keyboard from 'react-virtual-keyboard';
import styles from './Header.module.css'; // Importez votre fichier CSS pour les styles du header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faTimes } from '@fortawesome/free-solid-svg-icons'; // Importez les icônes pour ouvrir et fermer le clavier


const Header = () => {
    const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false); // État pour contrôler l'affichage du clavier virtuel

    // Fonction pour ouvrir le clavier
    const toggleKeyboard = () => {
        setShowVirtualKeyboard(!showVirtualKeyboard);
    };

    return (
        <header className={styles.header}><strong><em className={styles.em}>clavier</em></strong>
            {/* Icône pour ouvrir et fermer le clavier */}
            <FontAwesomeIcon
                icon={showVirtualKeyboard ? faTimes : faKeyboard}
                className={styles.keyboardIcon}
                onClick={toggleKeyboard}
            />
            {/* Afficher le clavier si showVirtualKeyboard est true */}
            {showVirtualKeyboard && <Keyboard />}
        </header>
    );
};

export default Header;
