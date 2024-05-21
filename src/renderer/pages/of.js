import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import HeaderWithNavigation from './HeaderWithNavigation';
import { useLocation } from 'react-router-dom';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const OF = () => {
  const location = useLocation();

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const { produitId } = location.state;

  useEffect(() => {
    // fetchData();
    setData(location.state.ofs);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/of', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();

      console.log('my ofs => ', jsonData);

      const formattedData = jsonData.map((item) => ({
        ...item,
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt),
      }));

      setData(formattedData);
      console.log('Données MongoDB récupérées avec succès:', formattedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleChooseClick = async (departements,ofId) => {
    try {
      /*   const selectedRow = data.find((row) => row._id === id);

      if (!selectedRow) {
        console.error('Row not found');
        return;
      }

      const { name, designation } = selectedRow;

      const response = await fetch('http://localhost:8080/api/of', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, designation }),
      });

      if (!response.ok) {
        throw new Error('Failed to add of');
      }

      console.log('of ajouté avec succès');*/

      console.log("departements ", departements)

      if (departements.length <= 0) {
        setMessage("Il y'a pas des appartements ");
      } else {
        setMessage('');
        navigate('/departement', { state: { departements: departements , matricule : location.state.matricule ,of:ofId } });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'of:", error);
    }
  };

  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="classA">
      <HeaderWithNavigation pageTitle="Fiche De affichage of" />
      <div className="no-background">
        <em>
          <h2 style={{ fontFamily: 'Georgia, serif' }}>page de affichage of</h2>
        </em>

        <div
          style={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '-60px',
          }}
        >
          {message && (
            <p
              style={{
                color: '#D2042D',
                float: 'right',
                fontWeight: 'bold',
              }}
            >
              {message}
            </p>
          )}
          <Link to="/login" style={{ marginLeft: '20px' }}>
            <button
              style={{
                padding: '5px',
                fontSize: '14px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            >
              Retour à la connexion
            </button>
          </Link>
          <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '20px' }} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '5px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      </div>
      <div className="spacer" style={{ height: ' 15px' }}></div>

      <div
        style={{
          height: '500px',
          width: '100%',
          overflow: 'auto',
          margin: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th
                style={{
                  padding: '20px',
                  border: '1px solid #ddd',
                  color: 'rgb(0, 110, 255)',
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: '20px',
                  border: '1px solid #ddd',
                  color: 'rgb(0, 110, 255)',
                }}
              >
                CreatedAt
              </th>
              <th
                style={{
                  padding: '20px',
                  border: '1px solid #ddd',
                  color: 'rgb(0, 110, 255)',
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row._id} style={{ border: '1px solid #ddd' }}>
                <td style={{ padding: '60px', border: '1px solid #ddd' }}>
                  {row.name}
                </td>

                <td style={{ padding: '60px', border: '1px solid #ddd' }}>
                  {row.createdAt}
                </td>
                <td style={{ padding: '60px', border: '1px solid #ddd' }}>
                  <button
                    className="choose-button"
                    onClick={() => handleChooseClick(row.departements,row.name)}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      backgroundColor: 'green',
                      color: '#ffffff',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Choisir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OF;
