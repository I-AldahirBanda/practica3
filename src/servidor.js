// Servidor HTTP básico en Node.js que muestra datos de una tabla MySQL

import http from 'node:http';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nivel2'
  });

// Configuración de la conexión a la base de datos MySQL
connection.connect((err) => {
    if (err) {
      console.error('Error conectando a la base de datos:', err.stack);
      return;
    }
    console.log('Conexión a la base de datos establecida con éxito.');
});

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/datos') {
      connection.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error al realizar la consulta a la base de datos' }));
          return;
        }
    
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
});
  
const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
  