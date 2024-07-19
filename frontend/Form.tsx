import './styles/styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CasesList: React.FC = () => {
    const [cases, setCases] = useState<any[]>([]);
    const [databaseFilter, setDatabaseFilter] = useState<string>('');
    const [schemaFilter, setSchemaFilter] = useState<string>('');
    const [personFilter, setPersonFilter] = useState<string>('');
    const [databases, setDatabases] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch databases when the component mounts
    const fetchDatabases = async () => {
        try {
            const response = await axios.get('http://localhost:8000/databases');
            setDatabases(response.data.databases);
        } catch (error) {
            setError('Error fetching databases');
            console.error('Error fetching databases:', error);
        }
    };

    // Fetch cases based on filters
    const fetchCases = async () => {
        try {
            const response = await axios.get('http://localhost:8000/cases', {
                params: {
                    database: databaseFilter || undefined,
                    schema: schemaFilter || undefined,
                    person: personFilter || undefined
                }
            });
            setCases(response.data.cases);
        } catch (error) {
            setError('Error fetching cases');
            console.error('Error fetching cases:', error);
        }
    };

    useEffect(() => {
        fetchDatabases();  // Fetch databases when the component mounts
    }, []);

    useEffect(() => {
        fetchCases();  // Fetch cases whenever filters change
    }, [databaseFilter, schemaFilter, personFilter]);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h1>Case Tracking</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    fetchCases();  // Fetch cases when the form is submitted
                }}
            >
                <div>
                    <label htmlFor="database">Database:</label>
                    <select
                        id="database"
                        value={databaseFilter}
                        onChange={(e) => setDatabaseFilter(e.target.value)}
                    >
                        <option value="">Select a database</option>
                        {databases.map((db, index) => (
                            <option key={index} value={db}>{db}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="schema">Schema:</label>
                    <input
                        type="text"
                        id="schema"
                        value={schemaFilter}
                        onChange={(e) => setSchemaFilter(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="person">Person:</label>
                    <input
                        type="text"
                        id="person"
                        value={personFilter}
                        onChange={(e) => setPersonFilter(e.target.value)}
                    />
                </div>
                <button type="submit">Apply Filters</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Database</th>
                        <th>Schema</th>
                        <th>Query</th>
                        <th>Person</th>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((caseItem) => (
                        <tr key={caseItem.id}>
                            <td>{caseItem.id}</td>
                            <td>{caseItem.database}</td>
                            <td>{caseItem.schema}</td>
                            <td>{caseItem.query}</td>
                            <td>{caseItem.person}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CasesList;
