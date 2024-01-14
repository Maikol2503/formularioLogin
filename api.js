const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurar la conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});


connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conexión a MySQL establecida');
  }
});

// Ruta para recibir datos y guardarlos en MySQL
app.post('/api/enviar-datos', (req, res) => {
  const datos = req.body;
  console.log('Datos recibidos:', datos);

  // Insertar datos en la tabla usuarios
  const query = 'INSERT INTO usuarios (correo, clave) VALUES (?, ?)';
  const values = [datos.correo, datos.clave];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.error('Error al insertar en MySQL:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    } else {
      console.log('Datos insertados en MySQL:', results);
      res.json({ mensaje: 'Datos recibidos y almacenados en MySQL con éxito' });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
