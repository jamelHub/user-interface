import React from 'react';

const Table = () => {
  // Définissez vos données de tableau
  const rows = [
    { id: 1, name: 'John', email: 'john@example.com', age: 30, phone: '123-456-7890', access: 'Admin' },
    { id: 2, name: 'Jane', email: 'jane@example.com', age: 25, phone: '987-654-3210', access: 'User' },
    // Ajoutez autant de lignes que nécessaire
  ];

  // Définissez les colonnes du tableau
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'age', headerName: 'Age', width: 120 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'access', headerName: 'Access', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>List d'of</h2>
      {/* Afficher le tableau */}
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.field}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              {columns.map(column => (
                <td key={column.field}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
