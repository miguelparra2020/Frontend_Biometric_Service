const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Configurar tus rutas de Express aquí
  server.get('/api/ejemplo', (req, res) => {
    res.json({ mensaje: 'Hola desde Express.js' });
  });

  // Configurar la ruta por defecto de Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
  });
});
