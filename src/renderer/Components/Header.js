import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <header className={styles.header}>
            {/* Affichage du lien "About us" */}
            <nav className={styles.navigation}>
                <button
                    style={{ 
                        backgroundColor: isHovered ? 'blue' : 'rgb(0, 162, 255)',
                        borderRadius: '8px',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                    onMouseOver={() => setIsHovered(true)}
                    onMouseOut={() => setIsHovered(false)}
                >
                    <Link to="/aboutus" className={styles.aboutLink}>About us</Link>
                </button>
            </nav>
        </header>
    );
};

export default Header;
