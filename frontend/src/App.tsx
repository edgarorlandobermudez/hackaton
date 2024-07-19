import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [database, setDatabase] = useState('');
  const [schema, setSchema] = useState('');
  const [query, setQuery] = useState('');
  const [person, setPerson] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/cases', {
        database,
        schema,
        query,
        person,
      });

      setResponseMessage(response.data.message); // Show the response message
    } catch (error) {
      console.error('Error enviar caso:', error);
      setResponseMessage('Error al enviar caso.');
    }
  };

  return (
    <div>
      <h1>Enviar Caso</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Database:
          <input
            type="text"
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
          />
        </label>
        <br />
        <label>
          Schema:
          <input
            type="text"
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
          />
        </label>
        <br />
        <label>
          Query:
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <br />
        <label>
          Persona:
          <input
            type="text"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
      <div>{responseMessage}</div> {/* Display the response message here */}
    </div>
  );
};

export default App;
