import React, { useEffect, useState } from 'react';
import './ficheDeControleQalitasCMS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faCalculator,
  faCheck,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import HeaderWithNavigation from './HeaderWithNavigation';
import tableData from './dataCMS';
import { useLocation } from 'react-router-dom';

const FicheDeControleQalitasCMS = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(tableData);
  const [carteRebutee, setCarteRebutee] = useState(false);
  const [searchDesignation, setSearchDesignation] = useState('');
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const [matricule, setMatricule] = useState('');
  const [ofName, setOfName] = useState('');

  const location = useLocation();

  useEffect(() => {
    console.log('locations =>', location);

    if (location.state != null) {
      setMatricule(location.state.matricule);
      setOfName(location.state.of)
    }
  }, [location]);

  const handleInputChange = (e, id, field) => {
    const newData = data.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: e.target.value };
      }
      return row;
    });
    setData(newData);
    setSearchDesignation('');
  };

  const handleIncrement = (id) => {
    const newData = data.map((row) => {
      if (row.id === id) {
        const newValue = row.qtDefaux ? parseInt(row.qtDefaux) + 1 : 1;
        return { ...row, qtDefaux: newValue };
      }
      return row;
    });
    setData(newData);
  };

  const handleDecrement = (id) => {
    const newData = data.map((row) => {
      if (row.id === id && parseInt(row.qtDefaux) > 0) {
        const newValue = parseInt(row.qtDefaux) - 1;
        return { ...row, qtDefaux: newValue };
      }
      return row;
    });
    setData(newData);
  };

  const calculateTotDefaux = () => {
    return data.reduce((total, row) => total + parseInt(row.qtDefaux || 0), 0);
  };

  const toggleCarteRebutee = () => {
    setCarteRebutee(!carteRebutee);
  };

  const saveData = async () => {
    try {

      const body = {
        defauts:data
      }
      const response = await fetch('http://localhost:8080/api/fichiers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body), // Envoyer les données actuelles
      });

      if (response.ok) {
        console.log('Données enregistrées avec succès !');
        navigate('/Of');
      } else {
        throw new Error("Erreur lors de l'enregistrement des données");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const columns = [
    { field: 'code', headerName: 'Code', width: 33 },
    { field: 'designation', headerName: 'Designation' },
    { field: 'qtDefaux', headerName: 'Qt Defaux' },
    { field: 'totDefaux', headerName: 'Tot Defaux' },
    { field: 'observation', headerName: 'Observation' },
  ];

  const filteredData = data.filter((row) =>
    row.designation.toLowerCase().includes(searchDesignation.toLowerCase()),
  );

  return (
    <div>
      <HeaderWithNavigation pageTitle="Fiche De Controle Qualitas pour CMS" />
      <div className="page-container">
        <div className="no-background">
          <div className="logo-and-title">
            {/* Image du logo */}
            <h2
              onMouseEnter={(e) => (e.target.style.color = 'green')}
              onMouseLeave={(e) => (e.target.style.color = 'blue')}
            >
              <em>Fiche De Controle Qualitas pour CMS</em>
            </h2>
          </div>

          <div className="bn">
            <div className="search-container">
              <input
                type="text"
                placeholder="Recherche par désignation..."
                value={searchDesignation}
                onChange={(e) => setSearchDesignation(e.target.value)}
                className="search-input"
              />

              <FontAwesomeIcon
                style={{ margin: '20px' }}
                icon={faSearch}
                className="search-icon"
              />
            </div>
            <div className="button-container-bn">
              <div className="input-container">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  style={{ borderStyle: 'groove' }}
                />
              </div>
              <div className="input-container">
                <label htmlFor="controleur">Contrôleur:</label>
                <input
                  type="text"
                  id="controleur"
                  style={{ borderStyle: 'groove' }}
                />
              </div>
            </div>
            <div className="spacer"></div>
            <div className="button-container-bn">
              <div className="input-container">
                <label htmlFor="matricule">Matricule:</label>
                <input
                  value={matricule}
                  type="text"
                  id="matricule"
                  style={{ borderStyle: 'groove' }}
                />
              </div>
              <div className="input-container">
                <label htmlFor="of">OF:</label>
                <input  value={ofName}  type="text" id="of" style={{ borderStyle: 'groove' }} />
              </div>
              <div className="input-container">
                <label htmlFor="quantite">Qté:</label>
                <input
                  type="text"
                  id="quantite"
                  style={{ borderStyle: 'groove' }}
                />
              </div>
            </div>
          </div>
          <div className="spacer"></div>
          <div style={{ height: 400, width: '100%', overflow: 'auto' }}>
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.field}>{column.headerName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column) => (
                      <td key={`${column.field}-${rowIndex}`}>
                        {column.field === 'qtDefaux' ? (
                          <div className="input-container">
                            <FontAwesomeIcon
                              icon={faArrowUp}
                              onClick={() => handleIncrement(row.id)}
                            />
                            <input
                              type="text"
                              id={column.field}
                              value={row[column.field]}
                              onChange={(e) =>
                                handleInputChange(e, row.id, column.field)
                              }
                            />
                            <FontAwesomeIcon
                              icon={faArrowDown}
                              onClick={() => handleDecrement(row.id)}
                            />
                          </div>
                        ) : column.field === 'totDefaux' ||
                          column.field === 'observation' ? (
                          <div className="input-container">
                            <input
                              type="text"
                              id={column.field}
                              value={row[column.field]}
                              onChange={(e) =>
                                handleInputChange(e, row.id, column.field)
                              }
                            />
                          </div>
                        ) : (
                          row[column.field]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '15px',
            }}
          >
            <button
              onClick={() => {
                const total = calculateTotDefaux();
                const newData = data.map((row) => ({
                  ...row,
                  totDefaux: total,
                }));
                setData(newData);
              }}
              className="butt"
              style={{ borderStyle: 'groove' }}
            >
              Calculer le Tot Defaux
            </button>
            <button
              onClick={() =>
                alert(`Total des défauts: ${calculateTotDefaux()}`)
              }
              className="butt"
              style={{ borderStyle: 'groove' }}
            >
              <FontAwesomeIcon icon={faCalculator} /> Calculer le Total des
              Défauts
            </button>
            <button
              onClick={toggleCarteRebutee}
              className="butt"
              style={{ borderStyle: 'groove', backgroundColor: 'red' }}
            >
              {carteRebutee ? 'Carte Rebutée' : 'Carte Non Rebutée'}
              {carteRebutee && <FontAwesomeIcon icon={faCheck} />}
            </button>
            <button
              onClick={saveData}
              className="butt"
              style={{ borderStyle: 'groove', backgroundColor: 'green' }}
            >
              Enregistrer
            </button>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    </div>
  );
};

export default FicheDeControleQalitasCMS;
