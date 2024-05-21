import React, { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Of from './pages/of';
import Departement from './pages/departement';
import TRAD from './pages/FicheDeControleQalitasTRAD';
import CABLAGE from './pages/FicheDeControleQalitasCABLAGE';
import FicheDeControleQalitasCMS from './pages/FicheDeControleQalitasCMS';
import Aboutus from './pages/Aboutus';
import Product from './pages/product';
import WelcomePage from './pages/WelcomePage';


export default function App() {
  useEffect(() => {
    const dropdownToggleList = document.querySelectorAll('.dropdown-toggle');
    dropdownToggleList.forEach((dropdownToggle) => {
      dropdownToggle.addEventListener('click', function() {
        const dropdownMenu = this.nextElementSibling;
        if (dropdownMenu.classList.contains('show')) {
          dropdownMenu.classList.remove('show');
        } else {
          dropdownMenu.classList.add('show');
        }
      });
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/of" element={<Of />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/product" element={<Product />} />

        <Route path="/departement" element={<Departement />} />
        <Route path="/CMS" element={<FicheDeControleQalitasCMS />} />
        <Route path="/TRAD" element={<TRAD />} />
        <Route path="/CABLAGE" element={<CABLAGE />} />
        <Route path="/Aboutus" element={<Aboutus />} />
      </Routes>
    </Router>
  );
}
