import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './login.css';
import Button from '../Components/Button';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import backgroundImage from './IMG_7288.jpg';




const Login = () => {
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

   const keyboard = useRef();
  const [layout, setLayout] = useState("default");

  const onChange = input => {
    setMatricule(input);
    console.log("Input changed", input);
  };

   {/*const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);

   
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setMatricule(input);
    keyboard.current.setInput(input);
  }; 
*/}
  useEffect(() => {
    const storedMatricule = localStorage.getItem('userMatricule');
    const storedPassword = localStorage.getItem('userPassword');

    if (storedMatricule && storedPassword) {
      setMatricule(storedMatricule);
      setPassword(storedPassword);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricule: matricule, password }),
      });

      if (!response.ok) {
        throw new Error('Identifiants invalides');
      }

      const responseData = await response.json();
      localStorage.setItem('userMatricule', matricule);
      localStorage.setItem('userPassword', password);
      localStorage.setItem('authToken', responseData.token.data); // Ajout du token dans la localStorage

      navigate('/product',{state:{produits:responseData.produits  , matricule:responseData.matricule}});

      console.log("Token d'authentification :", responseData.token.data);
      console.log(
        "Délai d'expiration du token :",
        responseData.token.expiresIn,
      );
      console.log("Statut d'administration :", responseData.administrator);
    } catch (error) {
      setValidationMessage(error.message);
    }
  };

 



  return (
    <div
      className="bg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div>
       

        <div className="login-body">
          <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form onSubmit={handleLogin} className="login-form">
              <div className="login-inputGroup">
                <strong>
                  <label htmlFor="matricule">Matricule</label>
                </strong>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="matricule"
                    name="matricule"
                    placeholder="Entrez votre matricule"
                    value={matricule}
                    onChange={(e) => setMatricule(e.target.value)}
                    required
                  />
                  <FontAwesomeIcon icon={faUser} className="input-icon" />
                </div>
              </div>
              <div className="login-inputGroup">
                <strong>
                  <label htmlFor="password">Mot de passe</label>
                </strong>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={() => setShowPassword(!showPassword)}
                    className="input-icon"
                  />
                </div>
              </div>
              {validationMessage && <p>{validationMessage}</p>}
              <Button />
            </form>
          </div>
        </div>
        {   <div className='keyboard'>
        {/*<Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />*/}
      </div> }
      </div>
    </div>
  );
};

export default Login;