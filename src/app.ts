// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Configuración de variables de entorno
dotenv.config();

// Importar rutas
import clientRoutes from './routes/clients.routes';
import voucherRoutes from './routes/voucher.routes';
import paymentRoutes from './routes/payments.routes';
import commissionRoutes from './routes/comission.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Logging de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/clients', clientRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/commission', commissionRoutes);

// Ruta de salud
app.get('/status', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Estado de la API'
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});