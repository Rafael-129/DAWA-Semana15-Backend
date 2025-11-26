const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/categories');

const app = express();

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL // URL de Vercel
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API E-commerce funcionando' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
