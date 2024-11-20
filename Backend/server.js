const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Importando node-fetch versión 2
const https = require('https');

// Crear un agente que ignore los errores de certificado SSL
const agent = new https.Agent({ rejectUnauthorized: false });

const app = express();

// Habilitar CORS para que el frontend pueda acceder al backend
app.use(cors({ origin: '*' })); // Permitir todas las solicitudes

// Ruta para obtener la cita
app.get('/api/cita', async (req, res) => {
    try {
        // Llamar a la API original con el agente que ignora SSL
        const response = await fetch('https://api.quotable.io/random', { agent });
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data); // Enviar la respuesta al frontend
    } catch (error) {
        console.error('Error al obtener la cita:', error);
        res.status(500).json({ error: 'Error al obtener la cita' });
    }
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});