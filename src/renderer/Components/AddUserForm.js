import React, { useState } from "react";

const AddUserForm = ({ onClose }) => {
    const [matricule, setMatricule] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envoyez les informations de l'utilisateur à votre API pour vérification et ajout dans la base de données
            const response = await fetch('https://cqualite.emkatech.tn/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricule, password })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
            }

            // Réinitialisez les champs après l'ajout réussi de l'utilisateur
            setMatricule("");
            setPassword("");
            setErrorMessage("");

            // Fermez le formulaire après l'ajout réussi de l'utilisateur
            onClose();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="add-user-form-container">
            <h2>Ajouter un nouvel utilisateur</h2>
            <form onSubmit={handleSubmit} className="add-user-form">
                <div className="form-group">
                    <label htmlFor="matricule">Matricule</label>
                    <input
                        type="text"
                        id="matricule"
                        value={matricule}
                        onChange={(e) => setMatricule(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddUserForm;
