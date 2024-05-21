import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import HeaderWithNavigation from './HeaderWithNavigation'; // Import HeaderWithNavigation

import {useLocation} from 'react-router-dom';


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Product = () => {

  const location = useLocation();

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const [message , setMessage]= useState("")
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('authToken'));


  useEffect(() => {
   // fetchData();
   setData(location.state.produits)
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/produits', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();

      // Convert timestamps to readable dates
      const formattedData = jsonData.map((item) => ({
        ...item,
        createdAt: formatDate(item.createdAt), // Formatting createdAt
        updatedAt: formatDate(item.updatedAt), // Formatting updatedAt
      }));

      setData(formattedData);
      console.log('Données MongoDB récupérées avec succès:', formattedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleChooseClick = async (ofs) => {
  /*  try {
      const selectedRow = data.find((row) => row._id === id);

      if (!selectedRow) {
        console.error('Row not found');
        return;
      }

      const { name, description } = selectedRow;
      const response = await fetch('http://localhost:8080/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      console.log('product ajouté avec succès');*/
      if(ofs.length<=0)
      {
        setMessage("Il n'y a pas d'ofs ")

      }

    else{
      setMessage("")
      navigate('/of',{ state: { ofs:ofs , matricule : location.state.matricule} });

    }

   /* } catch (error) {
      console.error("Erreur lors de l'ajout du product:", error);
    }*/
  };

  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="classA">
      <HeaderWithNavigation pageTitle="Fiche De affichage produit" />
      <div className="no-background">
        <em>
          <h2 style={{ fontFamily: 'Georgia, serif' }}>
            page de affichage produit
          </h2>
        </em>
{
  message && <p style={{
    color:"#D2042D",
    float:'right',
    fontWeight: 'bold'
  }}> {message}</p>
}
        <div
          style={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '-60px',
          }}
        >
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
          <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '1120px' }} />
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
                description
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
                  {row.description}
                </td>
                <td style={{ padding: '60px', border: '1px solid #ddd' }}>
                  <button
                    className="choose-button"
                    onClick={() => handleChooseClick(row.ofs)}
                    style={{
                      border: '1px solid #ddd', // Ajout du bord
                      borderRadius: '8px',
                      padding: '10px 20px', // Ajustement du rembourrage
                      cursor: 'pointer', // Changement du curseur au survol
                      transition: 'transform 0.2s ease', // Transition douce de la transformation
                      backgroundColor: 'green', // Couleur de fond par défaut
                      color: '#ffffff', // Couleur du texte en blanc
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.1)'; // Appliquer une transformation d'échelle au survol
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1)'; // Retour à la taille normale lorsque le survol est terminé
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

export default Product;
