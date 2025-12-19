// src/routes/clients.routes.ts
import { Router } from 'express';
import {getAllClients,getClientById,createClient,addCommissionScheme,getCommissionSchemes} from '../controllers/clients/clients.controller';

const router = Router();

// Rutas para clientes
router.get('/', getAllClients);
router.get('/:id', getClientById);
router.post('/', createClient);

// Rutas para esquemas de comisión
router.get('/:clientId/commission-schemes', getCommissionSchemes);
router.post('/:clientId/commission-schemes', addCommissionScheme);

export default router;