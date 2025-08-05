const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'formulario_bomberos_2025',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT) || 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

let pool;

const getConnection = async () => {
  try {
    if (!pool) {
      pool = new Pool(dbConfig);
      console.log('Conexión a la base de datos PostgreSQL establecida');
    }
    
    // Verificar si la conexión está activa
    try {
      const client = await pool.connect();
      await client.query('SELECT 1');
      client.release();
    } catch (error) {
      console.log('Conexión perdida, reconectando...');
      pool = null;
      pool = new Pool(dbConfig);
      console.log('Reconexión exitosa');
    }
    
    return pool;
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    pool = null;
    throw error;
  }
};

const closeConnection = async () => {
  try {
    if (pool) {
      await pool.end();
      pool = null;
      console.log('Conexión a la base de datos cerrada');
    }
  } catch (error) {
    console.error('Error al cerrar la conexión:', error);
  }
};

module.exports = {
  getConnection,
  closeConnection
}; 