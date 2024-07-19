-- init.sql

-- Crear base de datos
CREATE DATABASE hackatondb;

-- Crear usuario
CREATE USER hackatonuser WITH ENCRYPTED PASSWORD 'hackatonpassword';

-- Otorgar privilegios al usuario sobre la base de datos
GRANT ALL PRIVILEGES ON DATABASE hackatondb TO hackatonuser;

-- Conectar a la base de datos
\c hackatondb

-- Crear tabla de casos de soporte
CREATE TABLE IF NOT EXISTS support_cases (
    id SERIAL PRIMARY KEY,
    case_number VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de comentarios
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    case_id INTEGER REFERENCES support_cases(id) ON DELETE CASCADE,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos iniciales si es necesario
INSERT INTO support_cases (case_number, description) VALUES
('CASE001', 'Problema con la aplicación X'),
('CASE002', 'Consulta sobre el uso del módulo Y');
